var $kitchen; 
var $inStock; 
var $outOfStock;
var $editIngredient; 
var $addIngredient; 
var $order; 
var $orderOpt; 

function registerSubmitHandlers () {
  //unbind removes all handlers attached to the elements:
  $kitchen = $('form.kitchen').unbind();
  $inStock = $('form.markInStock').unbind();
  $outOfStock = $('form.MarkOutOfStock').unbind();
  $editIngredient = $('input.edit').unbind();
  $addIngredient = $('form#newIngredient').unbind();
  $order = $('form#order').unbind(); 
  $orderOpt = $('input.orderOpt').unbind();
  $kitchen.submit(HANDLERS.makeSubmitHandler('fulfilled', CALLBACKS.success.orderFulfilled));
  $inStock.submit(HANDLERS.makeSubmitHandler('outOfStock', CALLBACKS.success.toggleIngredient));
  $outOfStock.submit(HANDLERS.makeSubmitHandler('inStock', CALLBACKS.success.toggleIngredient));
  $addIngredient.submit(HANDLERS.makeSubmitHandler('addIngredient', CALLBACKS.success.newIngredient, true));
  $editIngredient.click(HANDLERS.click.edit);
  $orderOpt.click(HANDLERS.click.orderOpt);
}

registerSubmitHandlers();
