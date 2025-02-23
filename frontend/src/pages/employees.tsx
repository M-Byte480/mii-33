import { useEffect, useState } from "react";
import {
    Container,
    TextField,
    Button,
    List,
    ListItem,
    ListItemText,
    IconButton,
    Typography,
    Paper,
    Box,
    Alert,
    Snackbar,
    Popover,
} from "@mui/material";
import { Edit, Delete, Save, Cancel, Link as LinkIcon } from "@mui/icons-material";
import { getLocalStorageItem } from '../funcs/storage';

interface Employee {
    id: number;
    email: string;
    name: string;
    hourly_salary: number;
    position: string;
}

export function EmployeePage() {
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [newEmployee, setNewEmployee] = useState({ email: "", name: "", hourly_salary: 0, position: "" });
    const [editEmployee, setEditEmployee] = useState<Employee | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [copySuccess, setCopySuccess] = useState<string | null>(null);
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

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
        if (!employee.email || !employee.name || employee.hourly_salary <= 0 || !employee.position) {
            setError("Please fill out all fields correctly.");
            return;
        }

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
                setError(null);
            } catch (error) {
                console.error("Error updating employee:", error);
                setError("Error updating employee. Please try again.");
            }
        }
    };

    const handleCreate = async () => {
        if (!newEmployee.email || !newEmployee.name || newEmployee.hourly_salary <= 0 || !newEmployee.position) {
            setError("Please fill out all fields correctly.");
            return;
        }

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
                setNewEmployee({ email: "", name: "", hourly_salary: 0, position: "" });
                fetchEmployees();
                setError(null);
            } catch (error) {
                console.error("Error creating employee:", error);
                setError("Error creating employee. Please try again.");
            }
        }
    };

    const handleCopyUrl = (id: number) => {
        const url = `http://localhost:3000/feedback?employeeId=${id}`; // Replace with actual URL
        navigator.clipboard.writeText(url).then(() => {
            setCopySuccess("URL copied to clipboard");
        });
    };

    const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handlePopoverClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);

    return (
        <>
            <div className="min-h-screen bg-gray-100">
                {/* Header */}
                <header className="bg-blue-600 text-white py-20 text-center">
                    <h1 className="text-4xl font-bold">Your Employees</h1>
                </header>
                <Container maxWidth="md">
                    <Paper className="p-4 mt-4">
                        {error && <Alert severity="error">{error}</Alert>}
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
                        <TextField
                            label="Hourly Salary"
                            type="number"
                            value={newEmployee.hourly_salary}
                            onChange={(e) => setNewEmployee({ ...newEmployee, hourly_salary: parseFloat(e.target.value) })}
                            className="mr-2"
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            label="Position"
                            value={newEmployee.position}
                            onChange={(e) => setNewEmployee({ ...newEmployee, position: e.target.value })}
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
                                        <TextField
                                            label="Hourly Salary"
                                            type="number"
                                            value={editEmployee.hourly_salary}
                                            onChange={(e) =>
                                                setEditEmployee({ ...editEmployee, hourly_salary: parseFloat(e.target.value) })
                                            }
                                            className="mr-2"
                                            fullWidth
                                            margin="normal"
                                        />
                                        <TextField
                                            label="Position"
                                            value={editEmployee.position}
                                            onChange={(e) =>
                                                setEditEmployee({ ...editEmployee, position: e.target.value })
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
                                        <ListItemText primary={`${employee.email} - ${employee.name} - €${employee.hourly_salary} - ${employee.position}`} />
                                        <div className="flex space-x-2">
                                            <IconButton
                                                onClick={() => handleCopyUrl(employee.id)}
                                                color="primary"
                                                onMouseEnter={handlePopoverOpen}
                                                onMouseLeave={handlePopoverClose}
                                            >
                                                <LinkIcon />
                                            </IconButton>
                                            <Popover
                                                sx={{ pointerEvents: 'none' }}
                                                open={open}
                                                anchorEl={anchorEl}
                                                anchorOrigin={{
                                                    vertical: 'bottom',
                                                    horizontal: 'center',
                                                }}
                                                transformOrigin={{
                                                    vertical: 'top',
                                                    horizontal: 'center',
                                                }}
                                                onClose={handlePopoverClose}
                                                disableRestoreFocus
                                            >
                                                <Typography sx={{ p: 1 }}>Share feedback form link</Typography>
                                            </Popover>
                                            <IconButton onClick={() => setEditEmployee(employee)} color="primary">
                                                <Edit />
                                            </IconButton>
                                            <IconButton onClick={() => handleDelete(employee.id)} color="secondary">
                                                <Delete />
                                            </IconButton>
                                        </div>
                                    </div>
                                )}
                            </ListItem>
                        ))}
                    </List>
                </Container>
                <Snackbar
                    open={!!copySuccess}
                    autoHideDuration={3000}
                    onClose={() => setCopySuccess(null)}
                    message={copySuccess}
                />
            </div>
        </>
    );
}
