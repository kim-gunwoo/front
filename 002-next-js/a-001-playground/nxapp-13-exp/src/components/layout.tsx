import styled from "@emotion/styled"

interface IProps {
    children: React.ReactNode
}

export default function Layout({children}:IProps) {
    

    return <Container>
        layout
        {children}
    </Container>
}


const Container = styled.div`
    /* background: gray; */
`

