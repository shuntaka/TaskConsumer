function RPATaskExecuter(strategy) {
  this.strategy = strategy;
}
RPATaskExecuter.prototype.execute = (callback) => {
  this.strategy.execute(callback);
};

export default RPATaskExecuter;
