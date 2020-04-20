<?php
$Con = new mysqli("localhost", "root", "", "whatsfood");

if (!$Con) {
        echo '<h1>falhou ' + $Con+"</h1>";
}