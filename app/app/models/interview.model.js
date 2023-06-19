module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      title: String,
      description: String,
      status: String,
      hide: Boolean,
      created_at: { type: Date, default: Date.now },
      created_by: { type: String, default: 'System' },
      comments:[{
        comment: String,
        created_at: Date,
        created_by: String
      }]
    },
    { timestamps: true }
  );

  schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Interview = mongoose.model("interview", schema);
  return Interview;
};
