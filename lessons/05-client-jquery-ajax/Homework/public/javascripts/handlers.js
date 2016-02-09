var HANDLERS = {
	click: {
		orderOpt:function(event){
			console.log('hi');
			var checkbox = event.target;
			var $price = $('#price');
			var curVal = $price.html()
			//ternary operator ?=then :=else
			var addVal = $(checkbox).is(":checked") ? checkbox.value : -checkbox.value;
			var newVal = Number(curVal) + Number(addVal);
			$price.html(newVal.toFixed(2)); //returns string w number rounded 
		},
		edit: function(event) {
			console.log('hi');
			var $form =$(event.target).closest('form');
			var id = $form.attr('id');
			var name = prompt('Edit name of ingredient');
			if (name!=null && name.length>0) {
				var price = prompt('Edit price of ingredient');
				if (price!=null && price.length>0) {
					$.post('editIngredient', {
						id:id,
						name:name,
						price:price
					})
					.done(CALLBACKS.success.editIngredient)
					.error(CALLBACKS.error);

				}
			}
		}

	},
	submitHandler: function(route,success,ingreData){
		
		return function(event){
			console.log('hi');
			var $form = $(event.target);
			var postData = {};
			if (ingreData) {
				var form = $(event.target);
				postData.name = $form.find('input#name').val();
				postData.price = $form.find('input#price').val();
			}else{
				postData.id = event.target.id;
			}
			event.preventDefault();
			$.post(route,postData)
				.done(success)
				.error(CALLBACKS.error);
		}
	}
}
