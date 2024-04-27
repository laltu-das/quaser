<script setup>
import {useGoogleMaps} from "@/Composables/useGoogleMaps.js";

const apiKey = import.meta.env.VITE_GOOGLE_MAP_API_KEY;
const {map, autocomplete} = useGoogleMaps(apiKey);

</script>

<template>
    <div id="pac-card" class="pac-card">
        <div>
            <div id="title">Autocomplete search</div>
            <div id="type-selector" class="pac-controls">
                <input
                    id="changetype-all"
                    checked="checked"
                    name="type"
                    type="radio"
                />
                <label for="changetype-all">All</label>

                <input id="changetype-establishment" name="type" type="radio"/>
                <label for="changetype-establishment">establishment</label>

                <input id="changetype-address" name="type" type="radio"/>
                <label for="changetype-address">address</label>

                <input id="changetype-geocode" name="type" type="radio"/>
                <label for="changetype-geocode">geocode</label>

                <input id="changetype-cities" name="type" type="radio"/>
                <label for="changetype-cities">(cities)</label>

                <input id="changetype-regions" name="type" type="radio"/>
                <label for="changetype-regions">(regions)</label>
            </div>
            <br/>
            <div id="strict-bounds-selector" class="pac-controls">
                <input id="use-location-bias" checked type="checkbox" value=""/>
                <label for="use-location-bias">Bias to map viewport</label>

                <input id="use-strict-bounds" type="checkbox" value=""/>
                <label for="use-strict-bounds">Strict bounds</label>
            </div>
        </div>
        <div id="pac-container">
            <input id="pac-input" placeholder="Enter a location" type="text"/>
        </div>
    </div>
    <div id="map"></div>
    <div id="infowindow-content">
        <span id="place-name" class="title"></span><br/>
        <span id="place-address"></span>
    </div>
</template>

<style scoped>
#map {
    height: 500px;
}

#description {
    font-family: Roboto;
    font-size: 15px;
    font-weight: 300;
}

#infowindow-content .title {
    font-weight: bold;
}

#infowindow-content {
    display: none;
}

#map #infowindow-content {
    display: inline;
}

.pac-card {
    background-color: #fff;
    border: 0;
    border-radius: 2px;
    box-shadow: 0 1px 4px -1px rgba(0, 0, 0, 0.3);
    margin: 10px;
    padding: 0 0.5em;
    font: 400 18px Roboto, Arial, sans-serif;
    overflow: hidden;
    font-family: Roboto;
    padding: 0;
}

#pac-container {
    padding-bottom: 12px;
    margin-right: 12px;
}

.pac-controls {
    display: inline-block;
    padding: 5px 11px;
}

.pac-controls label {
    font-family: Roboto;
    font-size: 13px;
    font-weight: 300;
}

#pac-input {
    background-color: #fff;
    font-family: Roboto;
    font-size: 15px;
    font-weight: 300;
    margin-left: 12px;
    padding: 0 11px 0 13px;
    text-overflow: ellipsis;
    width: 400px;
}

#pac-input:focus {
    border-color: #4d90fe;
}

#title {
    color: #fff;
    background-color: #4d90fe;
    font-size: 25px;
    font-weight: 500;
    padding: 6px 12px;
}
</style>
