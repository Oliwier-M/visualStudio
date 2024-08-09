import { Box } from '@mui/material';
import Stack from '@mui/material/Stack';

interface GeneralListProps {
  children: React.ReactNode;
}

const ColumnList: React.FC<GeneralListProps> = ({ children }) => {
  return (
    <Box sx={{ marginX: 2, marginY: 3 }}>
      <Box
        sx={{
          width: '100%',
          height: '440px',
          overflowX: 'auto',
          overflowY: 'hidden',
          scrollbarWidth: 'none',
          '-ms-overflow-style': 'none',
          '&::-webkit-scrollbar': {
            display: 'none',
          },
        }}
      >
        <Stack direction="column" spacing={5}>
          {children}
        </Stack>
      </Box>
    </Box>
  );
};

export default ColumnList;
