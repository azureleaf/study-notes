<?php
// Run this file with "php -f hello.php" (-f can be omitted)
echo "Test the PHP array!\n";

// Create the array
$countries = array("Japan", "Korea", "China");

// Access by the index
echo "2nd element in the array is..." . $countries[1] . "\n";

// Loop the array
// count(arr) is equivalent to JS arr.length
for ($i = 0; $i < count($countries); $i++) {
    echo $countries[$i] . "\n";
}
