<template>
    <div class="w-full gap-x-2 gap-y-2 py-2 border-0 border-blue-500">
        <div class="w-full flex  border-b-2">
            <div class="flex-column w-1/2">Order #</div>
            <div class="flex-column w-1/2">{{ order.orderId }}</div>
        </div>
        <div class="w-full flex  border-b-2">
            <div class="flex-column w-1/2">Order Status</div>
            <div class="flex-column w-1/2">{{ order.orderStatus }}</div>
        </div>
        <div class="w-full flex  border-b-2">
            <div class="flex-column w-1/2">Order Date</div>
            <div class="flex-column w-1/2">{{ new Date(order.orderDate).toISOString().slice(0, 10) }}</div>
            <!-- moment(order.orderDate).format("DD/MM/YYYY"); -->
        </div>
        <div class="w-full flex  border-b-2">
            <div class="flex-column w-1/2">Order Amount</div>
            <div class="flex-column w-1/2">{{ order.orderAmount }}</div>
        </div>

        <div class="w-full flex  border-b-2">
            <ul>
                <li v-for="item in order.orderItems" :key="item._id">
                    Name: {{ item.itemName }} / Price: {{ item.itemPrice }} / Qty: {{ item.itemQty }}
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    name: 'OrderCard',
    props: ['order'],
    
    mounted: function () {
        // console.log("my ord data", this.orderData)
    }
}
</script>
