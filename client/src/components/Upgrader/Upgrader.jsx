import React from 'react'
import MainLayout from '../Layout/MainLayout'
import Upgrade from './Upgrade/Upgrade'
import DepositSection from '../DepositeSection/DepositeSection'
import GunCard from './GunCard/GunCard'
import { Box, TextField, Slider, Typography, makeStyles, Button, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

const useStyles = makeStyles((theme) => ({
    gunCardContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        margin: '10px 40px 10px 0px',
        marginLeft: '80px',
    },
    filterContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: '20px 40px 20px 50px',
    },
    searchContainer: {
        display: 'flex',
        alignItems: 'center',
        margin: '20px',
    },
    sliderContainer: {
        // margin: '20px',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '20px',
    },
    slider: {
        color: '#C81CC9',
        width: '200px',
        '& .MuiSlider-thumb': {
            backgroundColor: '#fff',
            border: '2px solid #ff00ff',

        },
    },
    dropdown: {
        background: 'linear-gradient(to bottom right, #2A212A 0%, #231B23 49%, #181218 100%)',
        width: '210px',
        borderRadius: '8px',
        '& .MuiSelect-select': {
            color: '#FFFFFF',
        },
        '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: '#FFFFFF',
        },
    },
}))

const Upgrader = () => {
    const classes = useStyles()
    const [priceRange, setPriceRange] = React.useState([0, 1.33224])
    const [filter, setFilter] = React.useState('priceDescending')

    const handleSliderChange = (event, newValue) => {
        setPriceRange(newValue)
    }

    const handleFilterChange = (event) => {
        setFilter(event.target.value)
    }

    return (
        <MainLayout>
            <Upgrade />

            <Box className={classes.filterContainer}>
                <Box className={classes.searchContainer}>
                    <TextField
                        variant="outlined"
                        placeholder="Search for item..."
                        InputProps={{
                            startAdornment: (
                                <span role="img" aria-label="search" style={{ color: '#FDF8FF', marginRight: '10px' }}>🔍</span>
                            ),
                            style: {
                                background: 'linear-gradient(to bottom right, #2A212A 0%, #231B23 49%, #181218 100%)',
                                borderRadius: '15px',
                                color: '#FDF8FF',
                            },
                        }}
                        InputLabelProps={{
                            style: { color: '#FDF8FF', marginLeft: '10px' },
                        }}
                        style={{ width: '240px', borderRadius: '15px' }}
                        fullWidth
                    />
                </Box>

                <Box className={classes.sliderContainer}>
                    <Typography gutterBottom>{priceRange[0]}</Typography>
                    <Slider
                        value={priceRange}
                        onChange={handleSliderChange}
                        valueLabelDisplay="auto"
                        min={0}
                        max={5}
                        className={classes.slider}
                    />
                    <Typography>
                        {priceRange[1]}
                    </Typography>

                    <FormControl variant="outlined" className={classes.dropdown}>
                        <Select
                            value={filter}
                            onChange={handleFilterChange}

                            className={classes.dropdown}
                            IconComponent={() => <ExpandMoreIcon style={{ color: '#FFFFFF', marginRight: '10px' }} />}
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value="priceAscending">Price Ascending</MenuItem>
                            <MenuItem value="priceDescending">Price Descending</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
            </Box>

            <Box className={classes.gunCardContainer}>
                {Array.from({ length: 21 }).map((_, index) => (
                    <GunCard key={index} />
                ))}
            </Box>

            <DepositSection />

        </MainLayout>
    )
}

export default Upgrader
