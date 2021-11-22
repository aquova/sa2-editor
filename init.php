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
    define("EGGMAN_LVLS", [
        ["Iron Gate", FALSE],
        ["Sand Ocean", FALSE],
        ["Lost Colony", FALSE],
        ["Weapons Bed", FALSE],
        ["Cosmic Wall", FALSE]
    ]);
    define("ROUGE_LVLS", [
        ["Dry Lagoon", FALSE],
        ["Egg Quarters", FALSE],
        ["Security Hall", FALSE],
        ["Route 280", TRUE],
        ["Mad Space", FALSE]
    ]);
    define("SHADOW_LVLS", [
        ["Radical Highway", FALSE],
        ["White Jungle", FALSE],
        ["Sky Rail", FALSE],
        ["Final Chase", FALSE]
    ]);

    define("SONIC_UPGRADES", ["Magic Gloves", "Light Shoes", "Ancient Light", "Bounce Bracelet", "Flame Ring", "Mystic Melody"]);
    define("TAILS_UPGRADES", ["Laser Blaster", "Booster", "Mystic Melody", "Bazooka"]);
    define("KNUX_UPGRADES", ["Mystic Melody", "Shovel Claw", "Air Necklace", "Hammer Gloves", "Sunglasses"]);
    define("SHADOW_UPGRADES", ["Flame Ring", "Air Shoes", "Ancient Light", "Mystic Melody"]);
    define("EGGMAN_UPGRADES", ["Laser Blaster", "Mystic Melody", "Jet Engine", "Large Cannon", "Protective Armor"]);
    define("ROUGE_UPGRADES", ["Mystic Melody", "Pick Nails", "Treasure Scope", "Iron Boots"]);

    function generate_all_tbls() {
        generate_all_upgrades();
        generate_all_levels();
    }

    function generate_toc() {
        echo "<h2>Sections:</h2>";
        echo "<ul>";
        echo "<li><a href='#sonic_stages'>Sonic Stages</a></li>";
        echo "<li><a href='#tails_stages'>Tails Stages</a></li>";
        echo "<li><a href='#knux_stages'>Knuckles Stages</a></li>";
        echo "<li><a href='#shadow_stages'>Shadow Stages</a></li>";
        echo "<li><a href='#eggman_stages'>Eggman Stages</a></li>";
        echo "<li><a href='#rouge_stages'>Rouge Stages</a></li>";
        echo "</ul>";
    }

    function generate_all_levels() {
        echo "<h2 id='sonic_stages'>Sonic Stages</h2>";
        foreach (SONIC_LVLS as $lvl) {
            generate_level_tbl($lvl[0], FALSE);
        }

        echo "<h2 id='tails_stages'>Tails Stages</h2>";
        foreach (TAILS_LVLS as $lvl) {
            generate_level_tbl($lvl[0], $lvl[1]);
        }

        echo "<h2 id='knux_stages'>Knuckles Stages</h2>";
        foreach (KNUX_LVLS as $lvl) {
            generate_level_tbl($lvl[0], FALSE);
        }

        echo "<br/>";
        echo "<hr/>";
        echo "<h2 id='shadow_stages'>Shadow Stages</h2>";
        foreach (SHADOW_LVLS as $lvl) {
            generate_level_tbl($lvl[0], FALSE);
        }

        echo "<h2 id='eggman_stages'>Eggman Stages</h2>";
        foreach (EGGMAN_LVLS as $lvl) {
            generate_level_tbl($lvl[0], $lvl[1]);
        }

        echo "<h2 id='rouge_stages'>Rouge Stages</h2>";
        foreach (ROUGE_LVLS as $lvl) {
            generate_level_tbl($lvl[0], $lvl[1]);
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

    function generate_all_upgrades() {
        echo "<h2>Upgrades</h2>";
        echo "<table>";
        echo "<tr>";
        echo "<td>Sonic</td>";
        echo "<td>";
        generate_upgrade_info(SONIC_UPGRADES);
        echo "</td>";
        echo "</tr>";
        echo "</table>";
    }

    function generate_upgrade_info($char_upgrades) {
        foreach ($char_upgrades as $upgrade) {
            $id_name = str_replace(' ', '-', $upgrade);
            echo "<input type='checkbox' id=$id_name>";
            echo "<label for=$id_name>$upgrade</label>";
        }
    }
?>
