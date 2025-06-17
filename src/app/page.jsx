"use client"
import { OverviewCardsGroup } from './(home)/_components/overview-cards';
import Home from './(home)/page';
import CounterDisplay from './components/CounterDisplay';

export default function HomePage() {
    return (
        <main>
            {/*
             <CounterDisplay />
             <OverviewCardsGroup />
            */}
            <Home />
        </main>
    );
}