
/*MUESTRA LA BICI MAS CARA DE MONTAÑA POR MARCA 
Y LA MARCA CUYA MEDIA DE PRECIO ES MENOR A  1000 € */

db.bici.aggregate([ 
    { $match: { Tipo: "Montaña"} },
    {$project:{
       Modelo: "$Modelo",
       Marca: "$Marca",
       Iva: {$multiply: ["$PreciodeVenta", 0.21]},
       PrecioConIva: {$sum: ["$PreciodeVenta","Iva"]},
       Color: "$Color"
    }},
    {$group: {
       _id: "$Marca", 
       PrecioMasElevado: { $max: "$PrecioConIva" },
       MediaDePrecio:  { $avg: "$PrecioConIva" },
    }},
    {$match: {$expr: {$lt: ["$MediaDePrecio", 1000]}}}
 ])