let autos = require("./autos")
let personas = require("./persona")
let concesionaria = {
   autos,
   buscarAuto: function (patente) {
      autoEncontrado = autos.find(function (auto) {
         return auto.patente === patente
      })
      return autoEncontrado ? autoEncontrado : null
   },
   venderAuto: function (patente) {
      this.buscarAuto(patente).vendido = true
   },
   autosParaLaVenta: function () {
      autosFiltrados = this.autos.filter(function (auto) {
         return auto.vendido === false
      })
      return autosFiltrados
   },
   autosNuevos: function () {
      ceroKm = this.autosParaLaVenta().filter(function (auto) {
         return auto.km === 0
      })
      return ceroKm
   },
   listaDeVentas: function () {
      let autosVendidos= this.autos.filter(function(auto){
         
         return auto.vendido===true
      })
      let preciosListados= autosVendidos.map(function (auto) {
        return auto.precio
      })
      return preciosListados
      },
      totalDeVentas: function () {
         /* let total=0 */
         let total = this.listaDeVentas().length ? this.listaDeVentas().reduce(function (acum, num) {
            return acum + num
         }) : 0
         return total
      },
      puedeComprar: function (auto,persona) {
         return persona.capacidadDePagoEnCuotas >= (auto.precio/auto.cuotas) && persona.capacidadDePagoTotal >= auto.precio
      },
      autosQuePuedeComprar: function (persona) {
         let autosQuePuedeComprar = this.autosParaLaVenta().filter(function (auto) {
            return this.puedeComprar(auto, persona)
         })
         return autosQuePuedeComprar
      }
}
console.log(concesionaria.autosQuePuedeComprar(personas[0]) );