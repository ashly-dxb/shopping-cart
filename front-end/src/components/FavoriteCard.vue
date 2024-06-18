<template>
    <div class="item">
        <p>{{ item.abbreviation }}</p>
        <p>{{ item.name }}</p>
        <p>{{ item.city }}</p>
    </div>
</template>
  
<script>
export default {
    props: {
        item: {
            type: Object,
            required: true
        }
    }
}
</script>
  
<style scoped>
.item {
    border: 1px solid gray;
    border-radius: .7rem;
    padding: .3rem;
    margin-top: .5rem;
    margin-bottom: .5rem;
    cursor: pointer;
}

.item:hover {
    background-color: orange;
}

.item p:first-child {
    /* font-weight: bold; */
    font-size: 1rem;
    margin: .3rem 0;
}

.item p:last-child {
    /* font-style: italic; */
    font-size: .6rem;
}
</style>
