import React from 'react'
import MainLayout from '../Layout/MainLayout'
import { HomeTableData } from '../NewHome/data/dummyData';
import CustomTable from '../CustomTable/CustomTable';
import BettingComponent from '../Upgrader/BettingComponent';
const CrashNew = () => {

    const columns = [
        { id: "game", label: "Game" },
        { id: "player", label: "Player" },
        { id: "wager", label: "Wager" },
        { id: "multiplier", label: "Multiplier" },
        { id: "payout", label: "Payout" },
    ];
    return (
        <MainLayout>
            <BettingComponent />

            <CustomTable columns={columns} data={HomeTableData} />
        </MainLayout>
    )
}

export default CrashNew
