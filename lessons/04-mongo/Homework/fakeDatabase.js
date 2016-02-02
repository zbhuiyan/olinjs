var FakeDatabase = module.exports = { //can export this db at top of own modules

    data: [],

    add: function(obj) {
        //adds item to end of array holding data
        FakeDatabase.data.push(obj);
    },

    getAll: function() {
        //returns copy of array of all items in the database
        return FakeDatabase.data.slice();
    },

    remove: function(index) {
        //removes item located at index in array and returns it
        // var index = data.length - 1
        return FakeDatabase.data.splice(index,1);
    }
   
}