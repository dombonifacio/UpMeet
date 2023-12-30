import { ChangeEvent, ChangeEventHandler, useState } from "react"

interface NavbarSearchProps {
    handleSearchClick: () => void;
    searchText: string
    handleSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void
   
    
}
export const NavbarSearch = ({handleSearchClick, handleSearchChange, searchText}: NavbarSearchProps) => {
    return (
        <>
            <input type="text" name="search" onChange={handleSearchChange} className="text-black" value={searchText}></input>
            <button onClick={handleSearchClick}>Search</button>
        </>
    )
}