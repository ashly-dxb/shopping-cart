<template>
    <div class="airport">
        <p>{{ airport.abbreviation }}</p>
        <p>{{ airport.name }}</p>
        <p>{{ airport.city }}, {{ airport.state }}</p>
    </div>
</template>
  
<script>
export default {
    props: {
        airport: {
            type: Object,
            required: true
        }
    }
}
</script>
  
<style scoped>
.airport {
    border: 1px solid gray;
    border-radius: .7rem;
    padding: .3rem;
    margin-top: .5rem;
    margin-bottom: .5rem;
    cursor: pointer;
}

.airport p:first-child {
    /* font-weight: bold; */
    font-size: 1rem;
    margin: .3rem 0;
}

.airport p:last-child {
    /* font-style: italic; */
    font-size: .6rem;
}
</style>
