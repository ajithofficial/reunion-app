import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import EmployeeDetails from "./EmployeeDetails";
import { useNavigate } from "react-router";
import { FaUsers, FaSearch, FaSortAmountDown } from 'react-icons/fa';
import { API_PATHS } from '../constants/api';

const Table = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [selectedUser, setSelectedUser] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [sortBy, setSortBy] = useState("asc");
    const navigate = useNavigate();

    const API_URL = process.env.REACT_APP_API_URL;
    const fetchUsers = useCallback(async () => {
        try {
            setTimeout(() => {
                setLoading(false);
            }, 1000);
            const res = await axios.get(`${API_URL}${API_PATHS.USERS}`);
            setUsers(res.data.data);
        } catch (err) {
            setError(err.response?.data || err.message);
            setLoading(false);
        }
    }, [API_URL]);

    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);

    const handleView = useCallback((user) => {
        setSelectedUser(user);
        setShowModal(true);
    }, []);

    const handleCloseModal = useCallback(() => {
        setShowModal(false);
        setSelectedUser(null);
    }, []);

    if (loading) return (
        <div className="d-flex justify-content-center align-items-center" style={{ height: "50vh" }}>
            <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    );

    if (error) return (
        <div className="alert alert-danger mx-auto mt-4" style={{ maxWidth: "500px" }}>
            <i className="fas fa-exclamation-triangle me-2"></i>
            Error: {error}
        </div>
    );

    const filteredUsers = users.filter(user => 
        user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.mobileNumber?.includes(searchTerm)
    );

    return (
        <div className="dashboard-container">
            <div className="d-flex justify-content-end mb-3">
                <button type="button" className="btn btn-outline-secondary px-4" onClick={() => navigate('/')}> 
                    <i className="bi bi-box-arrow-right me-2"></i> Logout
                </button>
            </div>
            {/* Stats Section */}
            <div className="stats-section">
                <div className="stat-card">
                    <div className="stat-icon">
                        <FaUsers />
                    </div>
                    <div className="stat-content">
                        <h3>{users.length}</h3>
                        <p>Total Users</p>
                    </div>
                </div>
            </div>

            <div className="main-card">
                <div className="card-header">
                    <div className="header-content">
                        <h2 className="dashboard-title">
                            <FaUsers className="title-icon" />
                            User Directory
                        </h2>
                        <div className="search-filter-section">
                            <div className="search-box">
                                <FaSearch className="search-icon" />
                                <input
                                    type="text"
                                    placeholder="Search users..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                            <button 
                                className="sort-btn"
                                onClick={() => setSortBy(sortBy === 'asc' ? 'desc' : 'asc')}
                            >
                                <FaSortAmountDown />
                            </button>
                        </div>
                    </div>
                </div>
                <div className="card-body p-0">
                    <div className="table-responsive">
                        <table className="table table-hover mb-0">
                            <thead className="table-light">
                                <tr>
                                    <th className="ps-4">NAME</th>
                                    <th>MOBILE NUMBER</th>
                                    <th className="text-center">ACTIONS</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredUsers.length > 0 ? (
                                    filteredUsers.sort((a, b) => {
                                        if (sortBy === "asc") {
                                            return a.name.localeCompare(b.name);
                                        } else {
                                            return b.name.localeCompare(a.name);
                                        }
                                    }).map((user, index) => (
                                        <tr key={index}>
                                            <td className="ps-4 fw-bold align-middle">
                                                <div className="d-flex align-items-center">
                                                    <div className="avatar-circle bg-primary text-white me-3">
                                                        {user.name.charAt(0).toUpperCase()}
                                                    </div>
                                                    <div>
                                                        {user.name.toUpperCase()}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="align-middle">
                                                <div className="d-flex align-items-center">
                                                    <i className="fas fa-mobile-alt me-2 text-primary"></i>
                                                    {user.mobileNumber}
                                                </div>
                                            </td>
                                            <td className="text-center align-middle">
                                                <button
                                                    className="btn btn-primary btn-sm action-btn me-2"
                                                    onClick={() => handleView(user)}
                                                >
                                                    <i className="fas fa-eye me-1"></i>
                                                    View
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="3" className="text-center py-4">
                                            <i className="fas fa-user-slash fa-2x mb-2 text-muted"></i>
                                            <p className="text-muted">No users found</p>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="card-footer bg-light">
                    <div className="row">
                        <div className="col-md-6">
                            <small className="text-muted">
                                <i className="fas fa-info-circle me-1"></i>
                                Showing {users.length} records
                            </small>
                        </div>
                    </div>
                </div>
            </div>

            {showModal && selectedUser && (
                <EmployeeDetails
                    user={selectedUser}
                    show={showModal}
                    onClose={handleCloseModal}
                />
            )}

            <style>{`
                .dashboard-container {
                    padding: 2rem;
                    background: #f8f9fc;
                    min-height: 100vh;
                }

                .stats-section {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
                    gap: 1.5rem;
                    margin-bottom: 2rem;
                }

                .stat-card {
                    background: linear-gradient(135deg, #6B8DD6 0%, #8E37D7 100%);
                    padding: 1.5rem;
                    border-radius: 15px;
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                    color: white;
                    transition: transform 0.3s ease;
                    box-shadow: 0 4px 20px rgba(0,0,0,0.1);
                }

                .stat-card:hover {
                    transform: translateY(-5px);
                }

                .stat-icon {
                    background: rgba(255,255,255,0.2);
                    padding: 1rem;
                    border-radius: 12px;
                    font-size: 1.5rem;
                }

                .stat-content h3 {
                    font-size: 1.8rem;
                    margin: 0;
                }

                .stat-content p {
                    margin: 0;
                    opacity: 0.8;
                }

                .main-card {
                    background: white;
                    border-radius: 20px;
                    box-shadow: 0 4px 20px rgba(0,0,0,0.08);
                    overflow: hidden;
                }

                .card-header {
                    background: white;
                    padding: 1.5rem;
                    border-bottom: 1px solid rgba(0,0,0,0.08);
                }

                .header-content {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    flex-wrap: wrap;
                    gap: 1rem;
                }

                .dashboard-title {
                    font-size: 1.5rem;
                    color: #2c3e50;
                    margin: 0;
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                }

                .title-icon {
                    color: #6B8DD6;
                }

                .search-filter-section {
                    display: flex;
                    gap: 1rem;
                    align-items: center;
                }

                .search-box {
                    position: relative;
                    width: 300px;
                }

                .search-icon {
                    position: absolute;
                    left: 12px;
                    top: 50%;
                    transform: translateY(-50%);
                    color: #6B8DD6;
                }

                .search-box input {
                    width: 100%;
                    padding: 0.8rem 1rem 0.8rem 2.5rem;
                    border: 1px solid #e1e5eb;
                    border-radius: 10px;
                    font-size: 0.9rem;
                    transition: all 0.3s ease;
                }

                .search-box input:focus {
                    outline: none;
                    border-color: #6B8DD6;
                    box-shadow: 0 0 0 3px rgba(107,141,214,0.1);
                }

                .filter-btn, .sort-btn {
                    background: white;
                    border: 1px solid #e1e5eb;
                    padding: 0.8rem;
                    border-radius: 10px;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    color: #6B8DD6;
                }

                .filter-btn:hover, .sort-btn:hover {
                    background: #f8f9fc;
                    border-color: #6B8DD6;
                }

                .filter-btn.active {
                    background: #6B8DD6;
                    color: white;
                    border-color: #6B8DD6;
                }

                .action-btn {
                    border-radius: 10px;
                    padding: 8px 16px;
                    background: linear-gradient(135deg, #6B8DD6 0%, #8E37D7 100%);
                    border: none;
                    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
                    transition: all 0.3s ease;
                    position: relative;
                    overflow: hidden;
                    color: white;
                }
                
                .action-btn::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: -100%;
                    width: 100%;
                    height: 100%;
                    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
                    transition: all 0.5s ease;
                }
                
                .action-btn:hover::before {
                    left: 100%;
                }
                
                .action-btn:hover {
                    background: linear-gradient(45deg, #224abe, #4e73df);
                    transform: translateY(-2px);
                    box-shadow: 0 4px 10px rgba(0,0,0,0.2);
                }
                
                .action-btn:active {
                    transform: translateY(0);
                    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
                }
                
                .table-hover tbody tr {
                    transition: all 0.3s ease;
                    border-bottom: 1px solid #f1f1f1;
                }

                .table-hover tbody tr:hover {
                    background-color: rgba(107,141,214,0.05);
                    transform: translateY(-1px);
                }
                
                .avatar-circle {
                    width: 40px;
                    height: 40px;
                    border-radius: 12px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-weight: bold;
                    font-size: 16px;
                    background: linear-gradient(135deg, #6B8DD6 0%, #8E37D7 100%);
                    color: white;
                    box-shadow: 0 4px 10px rgba(107,141,214,0.2);
                }

                thead {
                    background: #f8f9fc;
                }

                th {
                    color: #6B8DD6;
                    font-weight: 600;
                    padding: 1rem !important;
                    border-bottom: 2px solid #e1e5eb;
                }

                td {
                    padding: 1rem !important;
                    color: #2c3e50;
                    vertical-align: middle;
                }
                
                @media (max-width: 768px) {
                    .dashboard-container {
                        padding: 1rem;
                    }

                    .stats-section {
                        grid-template-columns: 1fr;
                        gap: 1rem;
                    }

                    .header-content {
                        flex-direction: column;
                        align-items: stretch;
                    }

                    .search-filter-section {
                        flex-wrap: wrap;
                    }

                    .search-box {
                        width: 100%;
                    }

                    .table-responsive {
                        border: none;
                        overflow-x: auto;
                        -webkit-overflow-scrolling: touch;
                        -ms-overflow-style: -ms-autohiding-scrollbar;
                        width: 100%;
                        display: block;
                        white-space: nowrap;
                        position: relative;
                        max-width: 100%;
                        margin-bottom: 1rem;
                        font-size: 0.875rem;
                    }
                
                    .table-responsive::-webkit-scrollbar {
                        height: 8px;
                    }
                
                    .table-responsive::-webkit-scrollbar-track {
                        background: #f1f1f1;
                        border-radius: 10px;
                    }
                
                    .table-responsive::-webkit-scrollbar-thumb {
                        background: #c1c1c1;
                        border-radius: 10px;
                    }
                
                    .table-responsive::-webkit-scrollbar-thumb:hover {
                        background: #a8a8a8;
                    }
                    
                    .card-header .badge {
                        position: relative !important;
                        top: 0 !important;
                        end: 0 !important;
                        margin: 10px !important;
                        display: inline-block;
                    }
                    
                    .action-btn {
                        padding: 5px 10px;
                        margin-bottom: 5px;
                    }
                }
            `}</style>
        </div>
    );
};

export default Table;