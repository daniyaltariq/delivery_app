import * as React from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Button from '@mui/material/Button';
import Navbar from '../Components/navbar';
import Modal from '../Components/modal';
import ParcelCard from '../Components/card';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import useMediaQuery from '@mui/material/useMediaQuery';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import { baseAPIUrl } from '../config';

export default function Dashboard() {
    const [tab, setTab] = React.useState(0);
    const [openModal, setOpenModal] = React.useState(false);
    const [pending, setPending] = React.useState([]);
    const [pickedUp, setPickedUp] = React.useState([]);
    const [delivered, setDelivered] = React.useState([]);
    const [deliveryBoy, setDeliveryBoy] = React.useState('');
    const [senderLocation, setSenderLocation] = React.useState('');
    const [receiverLocation, setReceiverLocation] = React.useState('');
    const [user, setUser] = React.useState({id: '', name: '', email: '', role: ''});
    const [dispatchersList, setDispatchersList] = React.useState([]);

    React.useEffect(() => {
        let userData = JSON.parse(sessionStorage.getItem('loginDetails')) || {id: '', name: '', email: '', role: ''};
        console.log(userData)
        if(userData.id){
        axios(`${baseAPIUrl}/user/readDispatcher.php`)
        .then( res => {
            console.log(res.data);

            if(res.data){
                const list = [];
                
                res.data.forEach( elem => list.push({value: elem.id, label: elem.name}));
    
                setDispatchersList(list);
            }
        })
        .catch( error => {
            console.log(error);
        })
        axios.post(`${baseAPIUrl}/parcel/read.php`, JSON.stringify({id: userData.id}))
            .then( res => {
                console.log(res.data);
                let deliveredData = [];
                let pickedUpData = [];
                let pendingData = [];
                (res.data && res.data.length) && res.data.forEach(elem => {
                    if(elem.track_history.length === 3){
                        deliveredData.push(elem);
                    } else if(elem.track_history.length === 2){
                        pickedUpData.push(elem);
                    } else {
                        pendingData.push(elem);
                    }
                });
                setPending(pendingData);
                setPickedUp(pickedUpData);
                setDelivered(deliveredData);
            })
            .catch( error => {
                console.log(error);
            })
        }
        setUser(userData)
    }, [sessionStorage.getItem['loginDetails']])
    
    const mobile = useMediaQuery('(max-width:600px)');

    const handleSubmit = () => {
    let date = new Date(Date.now());

    var deliveryBoyName = '';
    dispatchersList.forEach( elem => {
        if(elem.value === deliveryBoy ){
            deliveryBoyName = elem.label;
        }
    })

    let dataToAdd = {
        consignee: deliveryBoyName,
        consignee_id: deliveryBoy,
        track_history: [
            {
                status: 'Parcel Added',
                date: date.toLocaleString()
            }
        ],
        sending_location: senderLocation,
        receiving_location: receiverLocation,
    };
    addParcelDetails(dataToAdd)
    }


    const handleOpenModal = () => {
        setOpenModal(true);
    }

    const handleCloseModal = () => {
        setOpenModal(false);
    }

    const handleChange = (event, newValue) => {
      setTab(newValue);
    };

    const addParcelDetails = (dataToAdd) => {
        dataToAdd.id = uuidv4();
        dataToAdd.creator = user.id;
        console.log(dataToAdd);
        let newParcels = [dataToAdd, ...pending];
        setPending(newParcels);
        handleCloseModal();
        setDeliveryBoy('');
        setSenderLocation('');
        setReceiverLocation('');
        axios.post(`${baseAPIUrl}/parcel/create.php`, JSON.stringify(dataToAdd))
          .then(function (response) {
            console.log(response);
        })
          .catch(function (error) {
            console.log(error);
        });
    }

    const handleAddParcelButton = () => {
        if(mobile) {
            handleOpenModal();
        } else {
            handleSubmit();
        }
    }

    const deleteParcel = (id) => {
        if(tab === 0){
            let tempArr = pending.filter( elem => elem.id != id );
            setPending(tempArr);
        }
        if(tab === 1){
            let tempArr = pickedUp.filter( elem => elem.id != id );
            setPickedUp(tempArr);
        }
        if(tab === 2){
            let tempArr = delivered.filter( elem => elem.id != id );
            setDelivered(tempArr);
        }
    }

    const updateParcel = (data) => {
        if(data.status === 'Picked Up'){
            let currentParcel = pending.filter( elem => elem.id === data.parcelId );
            currentParcel[0].track_history.push({status: data.status, date: data.date});
            let tempArr = [currentParcel[0], ...pickedUp];
            setPickedUp(tempArr);
        } else {
            let currentParcel = pickedUp.filter( elem => elem.id === data.parcelId );
            currentParcel[0].track_history.push({status: data.status, date: data.date});
            let tempArr = [currentParcel[0], ...delivered];
            setDelivered(tempArr);
        }
        deleteParcel(data.parcelId);
    }

    return (
        <div className='bg-[#EFF1F2] h-screen'>
            <Navbar user={user.name} />
            <Modal dispatchersList={dispatchersList} openModal={openModal} handleCloseModal={handleCloseModal} addParcelDetails={addParcelDetails} />
            <div className='text-5xl font-bold text-center my-4'>{user.role} Portal</div>
            {user.role === 'seller' && <div className='flex justify-around items-center flex-wrap mb-4'>
                <h3 className='text-3xl font-bold'>Parcels</h3>
                {!mobile && <div className="mt-5 flex flex-row gap-3">
                    <TextField
                    id="Delivery-boy"
                    select
                    label="Delivery Boy"
                    value={deliveryBoy}
                    onChange={(e) => setDeliveryBoy(e.target.value)}
                    fullWidth
                    >
                        {dispatchersList.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                            {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                    <TextField value={senderLocation} onChange={(e) => setSenderLocation(e.target.value)} id="Deliver-from" label="Deliver from" variant="outlined" fullWidth />
                    <TextField value={receiverLocation} onChange={(e) => setReceiverLocation(e.target.value)} id="Deliver-to" label="Deliver to" variant="outlined" fullWidth />
                </div>}
                <Button variant="contained" onClick={handleAddParcelButton} sx={{height: 40}} >Add Parcel</Button>
            </div>}
            <Box sx={{ width: '100%', bgcolor: 'inherit' }}>
                <Tabs value={tab} onChange={handleChange} centered>
                    <Tab label="Pending" />
                    <Tab label="Picked" />
                    <Tab label="Delivered" />
                </Tabs>
            </Box>
            {
                (tab === 0 && pending.length > 0) ? pending.map((elem, index) => (
                    <div key={index} className='flex justify-center py-5 w-full bg-[#EFF1F2]'>
                        <ParcelCard
                        parcelId={elem.id}
                        consignee={elem.consignee}
                        trackStatus={elem.track_history}
                        senderLocation={elem.sending_location}
                        receiverLocation={elem.receiving_location}
                        userRole={user.role}
                        deleteParcel={deleteParcel}
                        updateParcel={updateParcel}
                        />
                    </div>
                )) :
                (tab === 1 && pickedUp.length > 0) ? pickedUp.map((elem, index) => (
                    <div key={index} className='flex justify-center py-5 w-full bg-[#EFF1F2]'>
                        <ParcelCard
                        parcelId={elem.id}
                        consignee={elem.consignee}
                        trackStatus={elem.track_history}
                        senderLocation={elem.sending_location}
                        receiverLocation={elem.receiving_location}
                        userRole={user.role}
                        deleteParcel={deleteParcel}
                        updateParcel={updateParcel}
                        />
                    </div>
                )) :
                (tab === 2 && delivered.length > 0) && delivered.map((elem, index) => (
                    <div key={index} className='flex justify-center py-5 w-full bg-[#EFF1F2]'>
                        <ParcelCard
                        parcelId={elem.id}
                        consignee={elem.consignee}
                        trackStatus={elem.track_history}
                        senderLocation={elem.sending_location}
                        receiverLocation={elem.receiving_location}
                        userRole={user.role}
                        deleteParcel={deleteParcel}
                        updateParcel={updateParcel}
                        />
                    </div>
                ))
            }
        </div>
    );
};
