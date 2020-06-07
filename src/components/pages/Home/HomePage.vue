<template src="./HomePage.html">
</template>

<script>
    export default {
        name: 'HomePage',
        props: {
            msg: String
        },
        data() {
            return {
                games: [
                    {
                        id: 1,
                        name: 'GTA V',
                        media: 'https://i.pinimg.com/originals/00/ad/ef/00adefafa4c6ff42963400799e34d233.jpg',
                        price: 10,
                        onCart: false,
                    },
                    {
                        id: 2,
                        name: 'Minecraft',
                        media: 'https://media.senscritique.com/media/000010502754/source_big/Minecraft.png',
                        price: 10,
                        onCart: false,
                    },
                    {
                        id: 3,
                        name: 'Call Of Duty: Black Ops III',
                        media: 'https://media.senscritique.com/media/000009741086/source_big/Call_of_Duty_Black_Ops_III.jpg',
                        price: 10,
                        onCart: false,
                    },
                    {
                        id: 4,
                        name: 'Les Sims 4',
                        media: 'https://d2tcpjlev2skwu.cloudfront.net/wp-content/uploads/2019/07/17080230/the-sims-4-jaquette.jpg',
                        price: 10,
                        onCart: false,
                    },
                    {
                        id: 5,
                        name: 'Borderlands 3',
                        media: 'https://www.jeuxvideo-live.com/news-img/mini/borderlands-3-artwork-5cb4afcf2202d-1555403339-article.jpg',
                        price: 10,
                        onCart: false,
                    },
                ],
                isCartSectionOpen: false,
                isCartOrdered: false,
            }
        },
        methods: {
            onAddCart(game) {
                game.onCart = !game.onCart;
            },
            openCartPage() {
                this.isCartSectionOpen = !this.isCartSectionOpen;
            },
            buyCart() {
                const body = JSON.stringify({
                    price: this.priceElementsOnCart,
                    items: this.gamesOnCart,
                    date: (new Date()).toISOString(),
                });

                const response = fetch('http://51.91.22.100:9200/store_order/_doc', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: body
                });

                response.then(() => {
                    this.games.forEach((elem) => {
                        if (elem.onCart) {
                            elem.onCart = false;
                        }
                    })
                    this.isCartSectionOpen = false;
                    this.isCartOrdered = true;
                })
            }
        },
        computed: {
            numberElementsOnCart() {
                let number = 0;
                this.games.forEach((elem) => {
                    if (elem.onCart) {
                        number++;
                    }
                })
                return number;
            },
            priceElementsOnCart() {
                let price = 0;
                this.games.forEach((elem) => {
                    if (elem.onCart) {
                        price = price + elem.price;
                    }
                })
                return price;
            },
            gamesOnCart() {
                let gamesOnCart = [];
                this.games.forEach((elem) => {
                    if (elem.onCart) {
                        gamesOnCart.push(elem.name);
                    }
                })
                return gamesOnCart;
            }
        },
        beforeCreate() {
            const body = JSON.stringify({date: (new Date()).toISOString()});
            fetch('http://51.91.22.100:9200/store_visit/_doc', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: body
            });
        }
    }
</script>

<style src="./HomePage.css">
</style>
