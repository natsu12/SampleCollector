Samples = new Mongo.Collection("samples");
Libraries = new Mongo.Collection("libraries");
Images = new FS.Collection("images", {
  stores: [new FS.Store.FileSystem("images", {path: "~/uploads"})],
  maxSize: 3145728,
  allow: {
    contentTypes: ['image/*'],
    extensions: ['png', 'PNG', 'jpg', 'JPG', 'jpeg', 'JPEG']
  }
});