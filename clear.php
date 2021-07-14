<?php
session_start();
if (isset($_SESSION['data'])) {
    $_SESSION['data'] = array();
}
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
            <td><?php echo number_format($word[5], 10, ".", "") ?></td>
        </tr>
    <?php }?>
</table>