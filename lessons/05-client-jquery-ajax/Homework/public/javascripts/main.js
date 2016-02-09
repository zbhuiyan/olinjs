var $kitchen; 
var $inStock; 
var $outOfStock;
var $editIngr; 
var $addIngr; 
var $order; 
var $orderOpt; 
registerSubmitHandlers();

function registerSubmitHandlers () {
  $kitchen = $('form.kitchen').unbind();
  $inStock = $('form.inStock').unbind();
  $outOfStock = $('form.outOfStock').unbind();
  $editIngr = $('input.edit').unbind();
  $addIngr = $('form#newIngredient').unbind();
  $order = $('form#order').unbind(); 
  $orderOpt = $('input.orderOpt').unbind();
  $kitchen.submit(HANDLERS.makeSubmitHandler('fulfilled', CALLBACKS.success.orderFulfilled));
  $inStock.submit(HANDLERS.makeSubmitHandler('markOutOfStock', CALLBACKS.success.toggleIngredient));
  $outOfStock.submit(HANDLERS.makeSubmitHandler('markInStock', CALLBACKS.success.toggleIngredient));
  $addIngr.submit(HANDLERS.makeSubmitHandler('addIngredient', CALLBACKS.success.newIngredient, true));
  $editIngr.click(HANDLERS.click.edit);
  $orderOpt.click(HANDLERS.click.orderOpt);
}