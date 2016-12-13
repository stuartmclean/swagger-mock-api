var fs = require('fs'),
    should = require('should'),
    mockDataProvider = require('../lib/mockDataFromSwaggerYaml')
    yaml = fs.readFileSync(__dirname + '/test.yaml', 'utf8'),
    provider = new mockDataProvider();

describe('mock data from swagger yaml', function () {
    describe('getMockData', function () {
        it('should return an empty object when the path-name does not exist in the yaml file', function () {
            provider.getMockData(yaml, 'foo').should.eql([]);
        });

        it('should return an object with test values when the path-name exists', function () {
            var expected = [
                {
                    "id": 1,
                    "branch": "test string for branch",
                    "is_active": true,
                    "name": "test string for name",
                    "latitude": 2,
                    "longitude": 3,
                    "discounts": [
                        {
                            "id": 4,
                            "name": "test string for name",
                            "description": "test string for description",
                            "start_date": "2016-01-01",
                            "end_date": "2016-01-01",
                            "opening_time": "test string for opening_time",
                            "closing_time": "test string for closing_time",
                            "condition_type": "test string for condition_type",
                            "condition_object": 5,
                            "condition_object_array": [
                                {} // todo - this should not be empty
                            ],
                            "minimum_order_value": 6.14159,
                            "discount_type": "test string for discount_type",
                            "discount_amount": 7.14159,
                            "promotional_limit": 8,
                            "file_name": "test string for file_name",
                            "bogo_product_blocks": [
                                {
                                    "id": 9,
                                    "block_type": "test string for block_type",
                                    "product_category_voucher": [
                                        {
                                            "object_type": "test string for object_type",
                                            "object_id": 10,
                                            "object_code": "test string for object_code",
                                            "quantity": 11
                                        }
                                    ]
                                }
                            ]
                        }
                    ],
                    "menus": [
                        {
                            "id": 12,
                            "name": "test string for name",
                            "opening_time": "test string for opening_time",
                            "menu_categories": [
                                {
                                    "id": 13,
                                    "code": "test string for code",
                                    "name": "test string for name",
                                    "description": "test string for description",
                                    "file_path": "test string for file_path",
                                    "mobify_file_path": "test string for mobify_file_path",
                                    "file_name": "test string for file_name",
                                    "inactive_products_qty": 14,
                                    "active_products_qty": 15,
                                    "container_price": 16.14159,
                                    "is_popular": true,
                                    "products": [
                                        {
                                            "id": 17,
                                            "name": "test string for name",
                                            "popular_product_ranking": 18,
                                            "service_tax_percentage": 19.14159,
                                            "vat_percentage": 20.14159,
                                            "is_express_item": true,
                                            "product_variations": [
                                                {
                                                    "id": 21,
                                                    "code": "test string for code",
                                                    "remote_code": "test string for remote_code",
                                                    "name": "test string for name",
                                                    "price": 22.14159,
                                                    "characteristics": [
                                                        {
                                                            "name": "test string for name",
                                                            "is_display_title": true,
                                                            "items": [
                                                                {
                                                                    "id": 23,
                                                                    "name": "test string for name",
                                                                    "use_symbol": true
                                                                }
                                                            ]
                                                        }
                                                    ],
                                                    "choices": [
                                                        {
                                                            "id": 24,
                                                            "name": "test string for name",
                                                            "quantity_minimum": 25,
                                                            "quantity_maximum": 26,
                                                            "options": [
                                                                {
                                                                    "id": 27,
                                                                    "remote_code": "test string for remote_code",
                                                                    "is_available": true,
                                                                    "position": "test string for position"
                                                                }
                                                            ]
                                                        }
                                                    ],
                                                    "toppings": [
                                                        {
                                                            "id": 28,
                                                            "name": "test string for name",
                                                            "quantity_minimum": 29,
                                                            "quantity_maximum": 30,
                                                            "options": [
                                                                {
                                                                    "id": 31,
                                                                    "name": "test string for name",
                                                                    "is_available": true,
                                                                    "price": 32.14159
                                                                }
                                                            ]
                                                        }
                                                    ]
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ];

            provider.getMockData(yaml, 'vendor').should.eql(expected);
        });
    })
})
