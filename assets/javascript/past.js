const { createApp } = Vue;

console.log(Vue);

createApp({
    data(){
        return{
            mensaje: "Bienvenidos al sitio",
            arrayOriginal: [],
            inputText: "",
            eventsFiltered: [],
            categories: undefined,
            cheked: []
        }
    },
    created(){
        fetch('https://mindhub-xj03.onrender.com/api/amazing')
        .then(response => response.json())
        .then(data => {
            console.log(data.events)
            this.arrayOriginal = data.events.filter(evnt => evnt.assistance)
            this.eventsFiltered = this.arrayOriginal
            this.categories = [...new Set(this.arrayOriginal.map(evnt => evnt.category))]
            setTimeout(() => this.mensaje = "Bienvenidos al sitio de amazing events", 2000)
        })
        .catch(error => console.log(error))
    },
    // methods:{
    //     filterByInputText: function filterText (){
    //         this.filterBySelected = this.arrayOriginal.filter(card => card.name.includes(this.inputText))
    //     }
    // }
    methods:{
        filterEvents (){
            this.eventsFiltered = this.arrayOriginal.filter(card => 
               (this.cheked.includes(card.category) || this.cheked.length === 0) && 
                card.name.toLocaleLowerCase().trim().includes(this.inputText.toLocaleLowerCase().trim()))
        }
    }
}).mount("#app");