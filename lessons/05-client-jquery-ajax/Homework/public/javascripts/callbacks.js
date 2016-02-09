var CALLBACKS = {
	success: { //order is marked as fulfilled in db and removed from page
			orderFulfilled: function(data, status){
				var formID = '#' +data;
				$(formID).remove();
			},
		toggleIngredient:function(data, status){
			var formID = '#' +data;
			var $form = $(formID).remove();
			$form.toggleClass('inStock outOfStock');
			var newVals = $form.hasClass ('inStock') ?
			['Out of Stock', 'markOutOfStock', 'div#in'] :
			['Restock', 'markInStock', 'div#out'];

			$form.find('input.submit').val(newVals[0]); //changes button txt
			$form.attr('action', newVals[1]); //changes form action
			$(newVals[2]).append($form[0].outerHTML); //put into doc

			registerSubmitHandlers();
		},
		editIngredient:function(data, status){
			data=JSON.parse(data);
			var $form = $('#'+data.id);
			var newText = data.name +' -$' + Number(data.price).toFixed(2);
			$form.find('span').html(newText);

		},
		newIngredient:function(data,status){
			if (!data) {
				alert("Cannot save, duplicate of existing ingredient");
			}else{
				var $form = $('form.inStock').first().clone();
				var label = data.name +'-$' + Number(data.price).toFixed(2);
				var newVals = ['Out of Stock', 'markOutOfStock', 'div#in'];

				$form.attr('id', data.__id);
				$form.find('span').html(label);
				$form.find('input.submit').val(newVals[0]);
					$form.attr('action', newVals[1]);
					$(newVals[2]).append($form[0].outerHTML);
					registerSubmitHandlers();
				}
		}
	},
	error: function(data, status){
		console.log('Error'+data);
	}
}