'use client'

import Button from '@/ui/elements/button'
import { AutoWidthBox, DynamicArea, ToolBar } from '@/ui/layout'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'

const Calendar = () => {
    return (
        <DynamicArea>
            <ToolBar>
                <Button secondary icon="icon-[mdi--add]" href="calendar/create">
                    Create
                </Button>
            </ToolBar>
            <AutoWidthBox>
                <FullCalendar
                    plugins={[dayGridPlugin]}
                    initialView="dayGridWeek"
                    headerToolbar={{
                        left: 'prev,next today',
                        center: 'title',
                        right: 'dayGridMonth,dayGridWeek,dayGridDay',
                    }}
                    events={[
                        { title: 'All Day Event', start: '2024-02-10' },
                        {
                            title: 'Long Event',
                            start: '2024-02-11',
                            end: '2024-02-20',
                        },
                        {
                            title: 'Repeating Event',
                            start: '2024-02-22T16:00:00',
                        },
                    ]}
                />
            </AutoWidthBox>
        </DynamicArea>
    )
}

export default Calendar
