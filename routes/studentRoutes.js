
const express = require('express');
const router = express.Router();
let students = require('../data/students');

router.get('/', (req, res) => {
    res.status(200).json(students);
});

router.get('/:id', (req, res) => {
    const id = parseInt(req.params.id);

    const student = students.find(s => s.id === id);

    if (!student) {
        return res.status(404).json({ message: "Student not found" });
    }

    res.status(200).json(student);
});

router.post('/', (req, res) => {
    const { name, course, email } = req.body;

    if (!name || !course || !email) {
        return res.status(400).json({ message: "All fields are required" });
    }

    const newStudent = {
        id: students.length > 0 ? Math.max(...students.map(s => s.id)) + 1 : 1,
        name: name,
        course: course,
        email: email
    };

    students.push(newStudent);

    res.status(201).json(newStudent);
});

router.put('/:id', (req, res) => {
    const id = parseInt(req.params.id);

    const student = students.find(s => s.id === id);

    if (!student) {
        return res.status(404).json({ message: "Student not found" });
    }

    const { name, course, email } = req.body;

    if (!name || !course || !email) {
        return res.status(400).json({ message: "All fields are required" });
    }

    student.name = name;
    student.course = course;
    student.email = email;

    res.status(200).json(student);
});

router.delete('/:id', (req, res) => {
    const id = parseInt(req.params.id);

    const index = students.findIndex(s => s.id === id);

    if (index === -1) {
        return res.status(404).json({ message: "Student not found" });
    }

    const deletedStudent = students.splice(index, 1);

    res.status(200).json({
        message: "Student deleted successfully",
        student: deletedStudent[0]
    });
});

module.exports = router;