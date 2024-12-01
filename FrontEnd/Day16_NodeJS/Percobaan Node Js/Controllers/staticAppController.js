const subscribers = [];
exports.getHomePage = (req, res) => {
    res.render("index", {mySubscribers: subscribers});
}
exports.getSubscribePage = (req, res) => {
    res.render("subscribe");
}
exports.saveSubscriber = (req, res) => {
    subscribers.push(req.body);
    res.render("thankyou");
}
