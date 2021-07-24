var robot = require("robotjs");

robot.moveMouseSmooth(709, 881, 1.45)

function click() {
    robot.mouseClick('left')
}

setTimeout(() => {
    robot.mouseClick('left')
    robot.moveMouseSmooth(611, 50, 1.45)
    click()
    robot.keyTap("backspace")
    robot.typeString("https://www.youtube.com/")
    robot.keyTap("enter")
    robot.moveMouseSmooth(378, 373, 1.45)

    setTimeout(() => {
        click()
        robot.moveMouseSmooth(1599, 881, 1.45)
        
        setTimeout(() => {
            click()
            robot.moveMouseSmooth(741, 453, 1.45)
            robot.mouseClick("right")
            robot.moveMouseSmooth(886, 701, 1.45)

            setTimeout(() => {
                robot.moveMouseSmooth(1067, 802, 1.45)
                click()

                setTimeout(() => {
                    robot.typeString("helloUser")
                    robot.keyTap("enter")
                    robot.moveMouseSmooth(801, 453, 1.45)
                    click()
                    click()

                    robot.typeStringDelayed("Hello there, compadre!\n\nThis code took roughly 2 hours to successfully complete, and it amounted to practically nothing.\nSo, for the next x amount of time, I'm going to type out each and every line of code just for you, buddy! Enjoy the video in the background, too!\n\nvar robot = require(\"robotjs\");\nrobot.moveMouseSmooth(709, 881, 1.45)\nfunction click() {\nrobot.mouseClick('left')\n}\n\nsetTimeout(() => {\nrobot.mouseClick('left')\nrobot.moveMouseSmooth(611, 50, 1.45)\nclick()\nrobot.keyTap(\"backspace\")\nrobot.typeString(\"https://www.youtube.com/\")\nrobot.keyTap(\"enter\")\nrobot.moveMouseSmooth(378, 373, 1.45)\n\nsetTimeout(() => {\nclick()\nrobot.moveMouseSmooth(1599, 881, 1.45)\n\nsetTimeout(() => {\nclick()\nrobot.moveMouseSmooth(741, 453, 1.45)\nrobot.mouseClick(\"right\")\nrobot.moveMouseSmooth(886, 701, 1.45)\n\nsetTimeout(() => {\nrobot.moveMouseSmooth(1067, 802, 1.45)\nclick()\n\nsetTimeout(() => {\nrobot.typeString(\"helloUser\")\nrobot.keyTap(\"enter\")\nrobot.moveMouseSmooth(801, 453, 1.45)\nrobot.mouseClick(\"left\", true)\nclick()\n\nrobot.typeString(\"Hello there, compadre\\n\\nThis code took roughly 2 hours to successfully complete, and it amounted to practically nothing. So, for the next x amount of time, I'm going to type out each and every line of code just for you, buddy! Enjoy the video in the background, too!\n\n\")\n\n}, 1000);\n\n}, 1000);\n\n}, 1000)\n\n}, 5000)\n\n}, 500)\n\nOk I'm done :D", 1000)

                }, 1000);

            }, 1000);

        }, 1000)

    }, 5000)

}, 500)