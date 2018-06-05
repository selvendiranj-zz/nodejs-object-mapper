var objectMapper = require('object-mapper');

//------------------------------------------------------------
//Transformation samples
//------------------------------------------------------------

var map = {
    "foo.fooChild1": {
        key: "foo.baz1",
        transform: function(value) {
            return value + "_foo";
        }
    },
    "foo.fooChild2": {
        key: "foo.baz2",
        transform: function(value) {
            return value + "_baz";
        }
    },
    "foo": {
        key: "name",
        transform: function(obj) {
            return obj.fooChild1 + obj.fooChild2;
        }
    },
    "bar": "bar"
};

var src = {
    foo: {
        fooChild1: 'blah1',
        fooChild2: 'blah2'
    },
    bar: 'something'
};

var dest = objectMapper(src, map);

// dest.foo: 'blah_foo'
// dest.baz: 'blah_baz'
// dest.bar: 'something'

//------------------------------------------------------------
//Nested mapping sampels
//------------------------------------------------------------

var src = {
    "sku": "12345",
    "upc": "99999912345X",
    "title": "Test Item",
    "description": "Description of test item",
    "length": 5,
    "width": 2,
    "height": 8,
    "inventory": {
        "onHandQty": 12
    }
};

var map = {
    "sku": "Envelope.Request.Item.SKU",
    "upc": "Envelope.Request.Item.UPC",
    "title": "Envelope.Request.Item.ShortTitle",
    "description": "Envelope.Request.Item.ShortDescription",
    "length": "Envelope.Request.Item.Dimensions.Length",
    "width": "Envelope.Request.Item.Dimensions.Width",
    "height": "Envelope.Request.Item.Dimensions.Height",
    "inventory.onHandQty": "Envelope.Request.Item.Inventory"
};

var dest = objectMapper(src, map);

/*
{
    Envelope: {
        Request: {
            Item: {
                SKU: "12345",
                UPC: "99999912345X",
                ShortTitle: "Test Item",
                ShortDescription: "Description of test item",
                Dimensions: {
                    Length: 5,
                    Width: 2,
                    Height: 8
                },
                Inventory: 12
            }
        }
    }
}; 
*/