exports.get404Page = (req, res) => {
  res.render("404", { pageTitle: "404 Error" });
};
