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

interface Guest {
    id: number;
    email: string;
    name: string;
}

export function GuestsPage() {
    const [guests, setGuests] = useState<Guest[]>([]);
    const [newGuest, setNewGuest] = useState({ email: "", name: "" });
    const [editGuest, setEditGuest] = useState<Guest | null>(null);

    useEffect(() => {
        fetchGuests();
    }, []);

    const fetchGuests = async () => {
        const jwt = getLocalStorageItem("mii-jwt");
        if (jwt) {
            try {
                const response = await fetch("http://localhost:3001/guests", {
                    headers: {
                        Authorization: `Bearer ${jwt}`,
                    },
                });
                const data = await response.json();
                setGuests(data);
            } catch (error) {
                console.error("Error fetching guests:", error);
            }
        }
    };

    const handleDelete = async (id: number) => {
        const jwt = getLocalStorageItem("mii-jwt");
        if (jwt) {
            try {
                await fetch(`http://localhost:3001/guests/${id}`, {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${jwt}`,
                    },
                });
                fetchGuests();
            } catch (error) {
                console.error("Error deleting guest:", error);
            }
        }
    };

    const handleUpdate = async (guest: Guest) => {
        const jwt = getLocalStorageItem("mii-jwt");
        if (jwt) {
            try {
                await fetch(`http://localhost:3001/guests/${guest.id}`, {
                    method: "PUT",
                    headers: {
                        Authorization: `Bearer ${jwt}`,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(guest),
                });
                setEditGuest(null);
                fetchGuests();
            } catch (error) {
                console.error("Error updating guest:", error);
            }
        }
    };

    const handleCreate = async () => {
        const jwt = getLocalStorageItem("mii-jwt");
        if (jwt) {
            try {
                await fetch("http://localhost:3001/guests", {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${jwt}`,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(newGuest),
                });
                setNewGuest({ email: "", name: "" });
                fetchGuests();
            } catch (error) {
                console.error("Error creating guest:", error);
            }
        }
    };

    return (
        <>
            <div className="min-h-screen bg-gray-100">
                {/* Header */}
                <header className="bg-blue-600 text-white py-20 text-center">
                    <h1 className="text-4xl font-bold">Your Guests</h1>
                </header>
                <Container maxWidth="sm">
                    <Paper className="p-4 mt-4">
                        <TextField
                            label="Email"
                            value={newGuest.email}
                            onChange={(e) => setNewGuest({ ...newGuest, email: e.target.value })}
                            className="mr-2"
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            label="Name"
                            value={newGuest.name}
                            onChange={(e) => setNewGuest({ ...newGuest, name: e.target.value })}
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
                            Add Guest
                        </Button>
                    </Paper>
                    <List>
                        {guests.map((guest) => (
                            <ListItem key={guest.id} className="border p-4 rounded flex justify-between items-center">
                                {editGuest && editGuest.id === guest.id ? (
                                    <div className="flex space-x-2">
                                        <TextField
                                            label="Email"
                                            value={editGuest.email}
                                            onChange={(e) =>
                                                setEditGuest({ ...editGuest, email: e.target.value })
                                            }
                                            className="mr-2"
                                            fullWidth
                                            margin="normal"
                                        />
                                        <TextField
                                            label="Name"
                                            value={editGuest.name}
                                            onChange={(e) =>
                                                setEditGuest({ ...editGuest, name: e.target.value })
                                            }
                                            className="mr-2"
                                            fullWidth
                                            margin="normal"
                                        />
                                        <IconButton onClick={() => handleUpdate(editGuest)} color="primary">
                                            <Save />
                                        </IconButton>
                                        <IconButton onClick={() => setEditGuest(null)} color="default">
                                            <Cancel />
                                        </IconButton>
                                    </div>
                                ) : (
                                    <div className="flex justify-between items-center w-full">
                                        <ListItemText primary={`${guest.email} - ${guest.name}`} />
                                        <ListItemSecondaryAction>
                                            <IconButton onClick={() => setEditGuest(guest)} color="primary">
                                                <Edit />
                                            </IconButton>
                                            <IconButton onClick={() => handleDelete(guest.id)} color="secondary">
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
