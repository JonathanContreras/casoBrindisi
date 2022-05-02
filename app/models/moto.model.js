module.exports = (mongoose) => {
  const Moto = mongoose.model(
    "moto",
    mongoose.Schema(
      {
        patente: String,
        chofer: String,
        activa: Boolean,
      },
      { timestamps: true }
    )
  );
  return Moto;
};
