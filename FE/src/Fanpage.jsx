import React, { useState, useEffect } from 'react'; 
import { useDispatch, useSelector } from 'react-redux';
import { followFanpage, unfollowFanpage, createFanpage, fetchFollowedFanpages } from './actions/fanpageActions'; 
import { logout } from './actions/userActions'; 
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom'; 

const Fanpage = () => {
    const [fanpages, setFanpages] = useState([]);
    const [newFanpageName, setNewFanpageName] = useState('');
    const dispatch = useDispatch();

    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;

    const followedFanpages = useSelector(state => state.fanpageFollow.followedFanpages?.[0]?.followedFanpages || []);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchFanpages = async () => {
            try {
                const response = await axios.get('/api/fanpages');
                setFanpages(response.data);
            } catch (error) {
                console.error("Error fetching fanpages:", error);
            }
        };

        fetchFanpages();

        if (userInfo && userInfo._id) {
            dispatch(fetchFollowedFanpages(userInfo._id));
        } else {
            console.error("User ID is not defined");
        }
    }, [dispatch, userInfo]);

    const refreshFanpages = async () => {
        try {
            const response = await axios.get('/api/fanpages');
            setFanpages(response.data);
            window.location.href = '/fanpage-dashboard';
        } catch (error) {
            console.error("Error fetching fanpages:", error);
        }
    };

    const handleFollow = async (fanpageId) => {
        await dispatch(followFanpage(fanpageId));
        refreshFanpages(); // Refresh the fanpages after following
    };

    const handleUnfollow = async (fanpageId) => {
        await dispatch(unfollowFanpage(fanpageId));
        refreshFanpages(); // Refresh the fanpages after unfollowing
    };

    const handleCreateFanpage = async (e) => {
        e.preventDefault();
        await dispatch(createFanpage(newFanpageName));
        setNewFanpageName('');
        refreshFanpages(); // Refresh the fanpages after creating a new fanpage
    };

    const handleLogout = () => {
        dispatch(logout());
        navigate('/loginFanpage');
    };

    return (
        <div>
            <h1>Fanpages</h1>
            {userInfo && (
                <div>
                    <h2>Welcome, {userInfo.name}!</h2>
                    <button onClick={handleLogout}>Logout</button>
                </div>
            )}
            <h2>All Fanpages</h2>
            <ul>
                {fanpages.map(fanpage => (
                    <li key={fanpage._id}>
                        <Link to={`/fanpage/${fanpage._id}/posts`}>{fanpage.name}</Link>
                        {followedFanpages.includes(fanpage._id) ? (
                            <button onClick={() => handleUnfollow(fanpage._id)}>Unfollow</button>
                        ) : (
                            <button onClick={() => handleFollow(fanpage._id)}>Follow</button>
                        )}
                    </li>
                ))}
            </ul>

            <h2>Create New Fanpage</h2>
            <form onSubmit={handleCreateFanpage}>
                <input
                    type="text"
                    value={newFanpageName}
                    onChange={(e) => setNewFanpageName(e.target.value)}
                    placeholder="Fanpage Name"
                    required
                />
                <button type="submit">Add Fanpage</button>
            </form>
        </div>
    );
};

export default Fanpage;
