<?php
// Run this file with "php -f oop.php" (-f can be omitted)

function test_normal_class()
{
    class Car
    {
        public $color; // default. Therefore the keyword "public" can be omitted
        protected $model; // can be accessed from the inherited class
        private $brand; // most strict; can't be accessed even from the inherited class
        const OWNER_NAME = "john oliver"; // class constant

        // default param is available with PHP
        function __construct($model, $color = "silver")
        {
            $this->model = $model;
            $this->color = $color;
        }

        function set_brand($brand)
        {
            $this->brand = $brand;
        }

        // Because of the "protected" keyword, this function can't be called outside the class
        protected function get_description()
        {
            return "Brand: {$this->brand}, Model: {$this->model}, Color: {$this->color} \n";
        }

        function __destruct()
        {
            // explain the car before destruction of the object
            echo $this->get_description();
            echo "Bye!\n";
        }
    }

    $red_car = new Car("civic");
    $red_car->set_brand("honda");
    echo "Owner of this car is " . $red_car::OWNER_NAME . ".\n";
}

function test_inheritance()
{
    class Fruit
    {
        protected $color;
        protected $name;

        function __construct($name, $color)
        {
            $this->name = $name;
            $this->color = $color;
        }

        public function describe()
        {
            echo "This is {$this->name} {$this->color}";
        }
    }

    class Berry extends Fruit
    {
        public $sour_index;

        function set_sour_index($index)
        {
            $this->sour_index = $index;
        }
    }

    // Because Berry class doesn't have the constructor,
    // constructor for parental Fruit class is applied here
    $myFruit = new Berry("red",  "strawberry");
    $myFruit->describe();
}


function test_override()
{
    class Rodentia
    {
        protected $name;

        function __construct($name)
        {
            $this->name = $name;
        }

        public function describe()
        {
            echo "This is {$this->name}.\n";
        }
    }

    class Degu extends Rodentia
    {
        public $color;

        function __construct($name, $color)
        {
            // Call the constructor of the parent
            parent::__construct($name);

            $this->color = $color;
        }

        // describe() method in the parent class will be overridden
        public function describe()
        {
            // Partially use the parent method
            echo parent::describe() . "he's {$this->color}.\n";
        }
    }

    $myDegu = new Degu("mickey", "white");
    $myDegu->describe();
}

// test_normal_class();
// test_inheritance();
test_override();
