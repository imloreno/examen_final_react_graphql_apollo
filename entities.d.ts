type post = {
  img: "url";
  profile: "url";
  title: "string";
  owner: "string";
};

type profile = {
  name: "string";
  img: "url";
  user: "string";
  password: "string";
};

type likes = {
  id_post: number;
  id_user: number;
};
