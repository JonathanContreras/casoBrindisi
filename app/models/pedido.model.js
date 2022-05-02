module.exports = (mongoose) => {
  const Pedido = mongoose.model(
    "pedido",
    mongoose.Schema(
      {
        nombre: String,
        pedido: String,
        direccion: String,
        asignado: String,
        id_pedido: Number,
        fecha_hora_despacho: String,
        tiempo_estimado_entrega: Number,
        precio: Number,
        estado: String,
      },
      { timestamps: true }
    )
  );
  return Pedido;
};
