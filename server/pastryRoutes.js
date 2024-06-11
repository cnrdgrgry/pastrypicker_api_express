//requiring express and create and instance of Router

const express = require("express");
const router = express.Router();

//requiring database + helper functions.

const pastryChoice = require("./pastryChoice");

//defining the routes

//get all from Pastries from the db
router.get("/", (req, res) => {
	if (pastryChoice) {
		res.status(200).json(pastryChoice);
	} else {
		res.status(404).json({ error: "Error 404; Resource not found!" });
	}
});

//create a new pastry for the db
router.post("/", (req, res) => {
	//checks to make sure there is a name or flavour

	if (!req.body.name || !req.body.primaryFlavour) {
		return res
			.status(400)
			.json({ error: "Error 400: Missing pastry name or flavor!" });
	}
	//otherwise carries on to create new post of pastry
	const newId = pastryChoice.length + 1;
	const newPastry = { ...req.body, id: newId };
	if (newPastry) {
		pastryChoice.push(newPastry);
		res.status(201).json(newPastry);
	} else {
		res.status(500).json({ error: "Error 500: Error baking pastry!" });
	}
});

//get a single pastry option by using its id
router.get("/:pastryId", (req, res) => {
	const { pastryId } = req.params;
	const parsedId = parseInt(pastryId, 10);
	const getPastry = pastryChoice.find((pastry) => pastry.id === parsedId);
	if (getPastry) {
		res.status(200).json(getPastry);
	} else {
		res.status(404).json({
			error: "Error 404; That particular Baked good has not been found!",
		});
	}
});

// PUT to update a single pastry by ID
router.put("/:pastryId", (req, res) => {
	const { pastryId } = req.params;
	const parsedId = parseInt(pastryId, 10);
	const index = pastryChoice.findIndex((pastry) => pastry.id === parsedId);

	//Checks for valid index
	if (index !== -1) {
		//checks to make sure there is a name or flavour
		if (!req.body.name && !req.body.primaryFlavour) {
			return res
				.status(400)
				.json({ error: "Error 400: Missing pastry name or flavor!" });
		}

		// Otherwise update the pastry with new data from req.body
		pastryChoice[index] = { id: parsedId, ...req.body };
		res.status(200).json(pastryChoice[index]);
	} else {
		res.status(404).json({ error: "Error 404: Baked goods not found!" });
	}
});
//delete a single pastry by its id

router.delete("/:pastryId", (req, res) => {
	const { pastryId } = req.params;
	const parsedId = parseInt(pastryId, 10);
	const index = pastryChoice.findIndex((pastry) => pastry.id === parsedId);

	if (index !== -1) {
		const deletedPastry = pastryChoice.splice(index, 1); // Remove the pastry from the array
		res.status(200).json(deletedPastry[0]); // Return the deleted pastry
	} else {
		res.status(404).json({ error: "Error 404: Baked goods not found!" });
	}
});

// exporting the router
module.exports = router;
