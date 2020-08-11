<?php
// Run this file with "php -f hello.php" (-f can be omitted)
echo "Test the PHP array!\n";

// Access the normal array by index
$countries = array("Japan", "Korea", "China");
echo "2nd element in the array is..." . $countries[1] . "\n";

// Loop the array
// count(arr) is equivalent to JS arr.length
for ($i = 0; $i < count($countries); $i++) {
    echo $countries[$i] . "\n";
}

// Associative array
$countries = array("Japan" => "Tokyo", "Korea" => "Seoul", "China" => "Beijing");
foreach ($countries as $country => $capital) {
    echo "Capital of " . $country . " is " . $capital . "\n";
}

// Sort arrays
$nums = array(5, -2, 3, 0, 2);
sort($nums);
echoArray($nums);

rsort($nums);
echoArray($nums);

function echoArray($arr)
{
    for ($i = 0; $i < count($arr); $i++) {
        echo $arr[$i] . " ";
    }
    echo "\n";
}

// Sort accociative arrays
$fruits = array("banana" => 2, "apple" => 5,  "citrus" => 1);

asort($fruits); // sort by values. Here "a" stands for "associative"
echoPairs($fruits);
ksort($fruits); // sort by keys
echoPairs($fruits);

function echoPairs($pairs)
{
    foreach ($pairs as $key => $value) {
        echo $key . " : " . $value . ", ";
    }
    echo "\n";
}
