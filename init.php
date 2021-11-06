<?php
    // Constants
    define("NUM_MISSIONS", 5);
    define("SONIC_LVLS", [
        ["City Escape", FALSE],
        ["Metal Harbor", FALSE],
        ["Green Forest", FALSE],
        ["Pyramid Cave", FALSE],
        ["Crazy Gadget", FALSE],
        ["Final Rush", FALSE],
    ]);
    define("TAILS_LVLS", [
        ["Prison Lane", FALSE],
        ["Mission Street", FALSE],
        ["Route 101", TRUE],
        ["Hidden Base", FALSE],
        ["Eternal Engine", FALSE],
    ]);
    define("KNUX_LVLS", [
        ["Wild Canyon", FALSE],
        ["Pumpkin Hill", FALSE],
        ["Aquatic Mine", FALSE],
        ["Death Chamber", FALSE],
        ["Meteor Herd", FALSE],
    ]);

    function generate_all_tbls() {
        echo "<h2>Sonic Stages</h2>";
        foreach (SONIC_LVLS as $lvl) {
            generate_level_tbl($lvl[0], FALSE);
        }

        echo "<h2>Tails Stages</h2>";
        foreach (TAILS_LVLS as $lvl) {
            generate_level_tbl($lvl[0], $lvl[1]);
        }

        echo "<h2>Knuckles Stages</h2>";
        foreach (KNUX_LVLS as $lvl) {
            generate_level_tbl($lvl[0], FALSE);
        }
    }

    function generate_level_tbl($lvl_name, $racing_lvl) {
        $id_name = str_replace(' ', '-', $lvl_name);
        echo "<h3>$lvl_name</h3>";
        echo "<table>";
        echo "<tr> <th>Mission</th> <th>Rank</th> <th># of Attempts</th> <th>High Scores</th> <th>Best Times</th> <th>Best Rings</th> </tr>";
        for ($i = 1; $i <= NUM_MISSIONS; $i++) {
            $pts = "0";
            if ($racing_lvl || $i == 2 || $i == 3) {
                $pts = "N/A";
            }
            echo "<tbody id=$id_name-$i>";
            echo "<tr>
                <td rowspan='3'>$i</td>
                <td rowspan='3' class='ranks'>Incomplete</td>
                <td rowspan='3' class='attempts'>0</td>
                <td class='points'>$pts</td>
                <td class='times'>30:00:00</td>
                <td class='rings'>0</td>
                </tr>";
            echo "<tr> <td class='points'>$pts</td> <td class='times'>40:00:00</td> <td class='rings'>0</td> </tr>";
            echo "<tr> <td class='points'>$pts</td> <td class='times'>50:00:00</td> <td class='rings'>0</td> </tr>";
            echo "</tbody>";
        }
        echo "</table>";
    }
?>
