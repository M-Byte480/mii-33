import { useEffect, useState } from "react";
import {
    Container,
    TextField,
    Button,
    List,
    ListItem,
    ListItemText,
    ListItemSecondaryAction,
    IconButton,
    Typography,
    Paper,
    Box,
} from "@mui/material";
import { Edit, Delete, Save, Cancel } from "@mui/icons-material";
import { getLocalStorageItem } from '../funcs/storage';

interface Employee {
    id: number;
    email: string;
    name: string;
}

export function EmployeePage() {
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [newEmployee, setNewEmployee] = useState({ email: "", name: "" });
    const [editEmployee, setEditEmployee] = useState<Employee | null>(null);

    useEffect(() => {
        fetchEmployees();
    }, []);

    const fetchEmployees = async () => {
        const jwt = getLocalStorageItem("mii-jwt");
        if (jwt) {
            try {
                const response = await fetch("http://localhost:3001/employees", {
                    headers: {
                        Authorization: `Bearer ${jwt}`,
                    },
                });
                const data = await response.json();
                setEmployees(data);
            } catch (error) {
                console.error("Error fetching employee:", error);
            }
        }
    };

    const handleDelete = async (id: number) => {
        const jwt = getLocalStorageItem("mii-jwt");
        if (jwt) {
            try {
                await fetch(`http://localhost:3001/employees/${id}`, {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${jwt}`,
                    },
                });
                fetchEmployees();
            } catch (error) {
                console.error("Error deleting employee:", error);
            }
        }
    };

    const handleUpdate = async (employee: Employee) => {
        const jwt = getLocalStorageItem("mii-jwt");
        if (jwt) {
            try {
                await fetch(`http://localhost:3001/employees/${employee.id}`, {
                    method: "PUT",
                    headers: {
                        Authorization: `Bearer ${jwt}`,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(employee),
                });
                setEditEmployee(null);
                fetchEmployees();
            } catch (error) {
                console.error("Error updating employee:", error);
            }
        }
    };

    const handleCreate = async () => {
        const jwt = getLocalStorageItem("mii-jwt");
        if (jwt) {
            try {
                await fetch("http://localhost:3001/employees", {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${jwt}`,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(newEmployee),
                });
                setNewEmployee({ email: "", name: "" });
                fetchEmployees();
            } catch (error) {
                console.error("Error creating employee:", error);
            }
        }
    };

    return (
        <>
            <div className="min-h-screen bg-gray-100">
                {/* Header */}
                <header className="bg-blue-600 text-white py-20 text-center">
                    <h1 className="text-4xl font-bold">Your Employees</h1>
                </header>
                <Container maxWidth="sm">
                    <Paper className="p-4 mt-4">
                        <TextField
                            label="Email"
                            value={newEmployee.email}
                            onChange={(e) => setNewEmployee({ ...newEmployee, email: e.target.value })}
                            className="mr-2"
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            label="Name"
                            value={newEmployee.name}
                            onChange={(e) => setNewEmployee({ ...newEmployee, name: e.target.value })}
                            className="mr-2"
                            fullWidth
                            margin="normal"
                        />
                        <Button
                            onClick={handleCreate}
                            variant="contained"
                            color="primary"
                            className="mt-2"
                            fullWidth
                        >
                            Add Employee
                        </Button>
                    </Paper>
                    <List>
                        {employees.map((employee) => (
                            <ListItem key={employee.id} className="border p-4 rounded flex justify-between items-center">
                                {editEmployee && editEmployee.id === employee.id ? (
                                    <div className="flex space-x-2">
                                        <TextField
                                            label="Email"
                                            value={editEmployee.email}
                                            onChange={(e) =>
                                                setEditEmployee({ ...editEmployee, email: e.target.value })
                                            }
                                            className="mr-2"
                                            fullWidth
                                            margin="normal"
                                        />
                                        <TextField
                                            label="Name"
                                            value={editEmployee.name}
                                            onChange={(e) =>
                                                setEditEmployee({ ...editEmployee, name: e.target.value })
                                            }
                                            className="mr-2"
                                            fullWidth
                                            margin="normal"
                                        />
                                        <IconButton onClick={() => handleUpdate(editEmployee)} color="primary">
                                            <Save />
                                        </IconButton>
                                        <IconButton onClick={() => setEditEmployee(null)} color="default">
                                            <Cancel />
                                        </IconButton>
                                    </div>
                                ) : (
                                    <div className="flex justify-between items-center w-full">
                                        <ListItemText primary={`${employee.email} - ${employee.name}`} />
                                        <ListItemSecondaryAction>
                                            <IconButton onClick={() => setEditEmployee(employee)} color="primary">
                                                <Edit />
                                            </IconButton>
                                            <IconButton onClick={() => handleDelete(employee.id)} color="secondary">
                                                <Delete />
                                            </IconButton>
                                        </ListItemSecondaryAction>
                                    </div>
                                )}
                            </ListItem>
                        ))}
                    </List>
                </Container>
            </div>
        </>
    );
}
