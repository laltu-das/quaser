import {onMounted, ref} from 'vue';

export function useGoogleMaps(apiKey) {
    const map = ref(null);
    const autocomplete = ref(null);
    const infowindow = ref(null);
    const marker = ref(null);
    const error = ref('');
    const currLocation = ref({latitude: 0, longitude: 0});
    const selectedLocation = ref({latitude: 0, longitude: 0});

    onMounted(() => {
        if (!window.google) {
            loadGoogleMapsApi(apiKey).then(() => {
                initMap();
            });
        } else {
            initMap();
        }
    });

    function loadGoogleMapsApi(key) {
        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = `https://maps.googleapis.com/maps/api/js?key=${key}&libraries=places`;
            script.async = true;
            script.defer = true;
            document.head.appendChild(script);
            script.onload = () => resolve();
            script.onerror = (error) => reject(error);
        });
    }

    function initMap() {
        map.value = new google.maps.Map(document.getElementById("map"), {
            center: {lat: 40.749933, lng: -73.98633},
            zoom: 13,
            mapTypeControl: false,
        });

        const input = document.getElementById("pac-input");
        const options = {
            fields: ["formatted_address", "geometry", "name"],
            strictBounds: false,
        };

        autocomplete.value = new google.maps.places.Autocomplete(input, options);
        autocomplete.value.bindTo("bounds", map.value);

        infowindow.value = new google.maps.InfoWindow();
        marker.value = new google.maps.Marker({
            map: map.value,
            anchorPoint: new google.maps.Point(0, -29),
        });

        autocomplete.value.addListener("place_changed", updateMapWithPlace);
    }

    function updateMapWithPlace() {
        infowindow.value.close();
        marker.value.setVisible(false);

        const place = autocomplete.value.getPlace();

        if (!place.geometry || !place.geometry.location) {
            window.alert("No details available for input: '" + place.name + "'");
            return;
        }

        if (place.geometry.viewport) {
            map.value.fitBounds(place.geometry.viewport);
        } else {
            map.value.setCenter(place.geometry.location);
            map.value.setZoom(17);
        }

        marker.value.setPosition(place.geometry.location);
        marker.value.setVisible(true);

        infowindow.value.setContent('<div><strong>' + place.name + '</strong><br>' +
            'Place ID: ' + place.place_id + '<br>' +
            place.formatted_address + '</div>');
        infowindow.value.open(map.value, marker.value);
    }

    const locatorButtonPress = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                position => {
                    currLocation.value = {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude
                    };

                    // Center the map on the user's location
                    const userLocation = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
                    map.value.setCenter(userLocation);
                    map.value.setZoom(15);

                    // Optionally, create a marker at the user's location
                    marker.value.setPosition(userLocation);
                    marker.value.setVisible(true);
                    map.value.fitBounds(new google.maps.LatLngBounds(userLocation, userLocation));
                },
                error => {
                    error.value = "Unable to retrieve your location";
                }
            );
        } else {
            error.value = "Geolocation is not supported by this browser.";
            alert('Geolocation is not supported by this browser.');
        }
    };

    return {map, autocomplete, infowindow, marker, locatorButtonPress, error, currLocation};
}
