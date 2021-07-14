<?php

function check($x, $y, $r): string
{
    if ((($x <= $r) && ($x >= 0) && ($y <= 0) && ($y >= -$r))
        || (($x <= 0) && ($y >= 0) && ($x * $x + $y * $y <= $r * $r)) ||
        (($y >= -$r / 2) && ($y <= 0) && ($x >= -$r) && ($x <= 0) && ($x + 2 * $y >= -$r))) {
        return "<span style='color: lime'>True</span>";
    } else {
        return "<span style='color: red'>False</span>";
    }
}

session_start();
date_default_timezone_set('Europe/Moscow');
$start = microtime(true);
$x = (float)$_GET['x'];
$y = (float)$_GET['y'];
$r = (float)$_GET['r'];
$result = check($x, $y, $r);
$now = date("H:i:s");
$now .= "⏰";
$time =  microtime(true) - $start;
$answer = array($x, $y, $r, check($x, $y, $r), $now, $time);
if (!isset($_SESSION['data'])) {
    $_SESSION['data'] = array();
}
array_push($_SESSION['data'], $answer);

?>
<table align="center" class="result_table">
    <tr>
        <th class="variable">X</th>
        <th class="variable">Y</th>
        <th class="variable">R</th>
        <th>Result</th>
        <th>Submission time</th>
        <th>Calculation time</th>
    </tr>
    <?php foreach ($_SESSION['data'] as $word) { ?>
        <tr>
            <td><?php echo $word[0] ?></td>
            <td><?php echo $word[1] ?></td>
            <td><?php echo $word[2] ?></td>
            <td><?php echo $word[3] ?></td>
            <td><?php echo $word[4] ?></td>
            <td><?php echo number_format($word[5], 10, ".", "") . " sec" ?></td>
        </tr>
    <?php } ?>
</table>