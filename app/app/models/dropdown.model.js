module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      name: String,
      value: String,
      active: Boolean
    },
    { timestamps: false }
  );

  schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Dropdown = mongoose.model("dropdown", schema);
  return Dropdown;
};
