const App = {
    data() {
        return {
            user: {
                "username": "",
                "password": ""
            },
            apiInfo: {
                url: 'https://vue3-course-api.hexschool.io/v2',
                path: 'chun-chia'
            },products:[],
            productList: [
                {
                    id: 1,
                    title: "焦糖熱奶茶",
                    originPrice: 80,
                    sellPrice: 60,
                    isActive: true,
                    type: "熱飲",
                    productDiscription: '濃郁的焦糖配上口感濃密的奶茶，是來此必點的飲品之一。',
                    productSize: "350ml",
                    imgUrl: 'https://media.istockphoto.com/photos/pumpkin-coffee-in-transparent-cup-and-whipped-cream-with-cinnamon-picture-id1333269760',
                    imgUrl2: 'https://media.istockphoto.com/photos/pumpkin-coffee-in-transparent-cup-and-whipped-cream-with-cinnamon-picture-id1333269760',

                },
                {
                    id: 2,
                    title: "可可脆片拿鐵冰沙",
                    originPrice: 150,
                    sellPrice: 120,
                    isActive: true,
                    type: "冰沙",
                    productDiscription: '酥脆的可可配上拿鐵冰沙，令人感到驚艷。',
                    productSize: "350ml",
                    imgUrl: 'https://media.istockphoto.com/photos/chocolate-milkshake-with-pieces-of-chocolate-chip-cookies-picture-id1332118836',
                    imgUrl2: 'https://media.istockphoto.com/photos/chocolate-milkshake-with-pieces-of-chocolate-chip-cookies-picture-id1332118836',

                },
                {
                    id: 3,
                    title: "蒜香牛排可頌三明治",
                    originPrice: 290,
                    sellPrice: 250,
                    isActive: true,
                    type: "三明治",
                    productDiscription: '濃郁的焦糖配上口感濃密的奶茶，是來此必點的飲品之一',
                    productSize: "400g",
                    imgUrl: 'https://media.istockphoto.com/photos/sandwich-with-fillet-mignon-meat-steak-croissant-and-blue-cheese-picture-id1357344570',
                    imgUrl2: 'https://media.istockphoto.com/photos/sandwich-with-fillet-mignon-meat-steak-croissant-and-blue-cheese-picture-id1357344570',

                },
            ],
            productTemp: {},
        }
    },
    methods: {
        showPorduct(e) {
            if (e.target.nodeName === 'BUTTON') {
                const index = e.target.dataset.index;
                this.productTemp = this.products[index];

            }
            else { return }
        },
        activeProduct(e) {
            const index = e.target.dataset.index;
            if (this.products[index].is_enabled === 0) {
                this.products[index].is_enabled = 1;
            } else {
                this.products[index].is_enabled = 0;
            }
            //console.log(this.products[index].is_enabled)
        },
        login() {
            console.log(this.user);
            if (this.user.username !== '' && this.user.password !== '') {
                axios.post(`${this.apiInfo.url}/admin/signin`, this.user).then((res) => {
                    //console.log(res.data)
                    //把token存到cookie
                    document.cookie =`myHextoken=${res.data.token}; expires=${new Date(res.data.expired)}`;
                    //轉跳頁面到產品資料頁
                    location.href="./Vue first week-3.html"
                }).catch((err) => {
                    console.log(err.response)
                })
            }else{alert("請輸入帳號與密碼")}
        },
        getProduct(){
            //console.log(location.pathname)
            //判斷目前頁面是否為"/Vue first week-3.html"可以先用console.log(location.pathname)確認
            if(location.pathname==='/Vue%20first%20week-3.html'){
                //取得所存在cookie的token
                const myToken = document.cookie.replace(/(?:(?:^|.*;\s*)myHextoken\s*\=\s*([^;]*).*$)|^.*$/, "$1");
                axios.defaults.headers.common['Authorization'] = myToken;
                axios.get(`${this.apiInfo.url}/api/${this.apiInfo.path}/admin/products`).then((res)=>{
                    this.products= res.data.products;
                    
                    console.log(this.products)

                    //console.log(res.data)
                }).catch((err)=>{
                    console.log(err.response)
                })
            }else{console.log('123')}
        }

    },
    mounted() { 
        this.getProduct()
    }
}
Vue.createApp(App).mount("#App")