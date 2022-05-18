import ImageKit from "imagekit";

var imagekit = new ImageKit({
  publicKey: "public_RvcoddD/w2gu+um0O577FBGmtF4=",
  privateKey: "private_KGSrryFlrXbzPoAfaD+LQlWBWGE=",
  urlEndpoint: "https://ik.imagekit.io/bonanzahskeyclub",
});

imagekit
  .upload({
    file: "https://api.mapbox.com/styles/v1/mapbox/dark-v10/static/pin-s+F00(-115.27553960209404,36.17104538581902)/-115.27553960209404,36.17104538581902,15.25,0,0/400x400?access_token=pk.eyJ1IjoiYm9uYW56YWhza2V5Y2x1YiIsImEiOiJjbDEycmRwamwwZHNnM2RwM3N1d3h0MXJhIn0.tm5U1cx09Mcliqo5iqLEow",
    fileName: "my_file_name.jpg",
  })
  .then((res) => {
    console.log(res.url);
  })
  .catch((e) => {
    console.log(e);
  });
