'use client';
import { useState } from "react";
import { prepareContractCall } from "thirdweb";
import { useSendTransaction, useReadContract } from "thirdweb/react";
import { getContract } from "thirdweb";
import { client } from "../lib/utils";
import { defineChain } from "thirdweb";
import { ethers } from "ethers"; // Impor untuk konversi Ether ke Wei
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Navbar from "./ui/navbar";


import { Button, TextField, Card, CardContent, Typography, Box , Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Grid,} from "@mui/material";
  const theme = createTheme({
    palette: {
      background: {
        default: "#1c202e", // Background utama tetap gelap
        paper: "#252b3a",  // Kartu dengan warna gelap lebih terang
      },
      text: {
        primary: "#ffffff",  // Teks utama berwarna putih
        secondary: "#b0b3bd", // Teks sekunder abu terang
      },
    },
    components: {
      MuiTableCell: {
        styleOverrides: {
          root: {
            backgroundColor: "#252b3a",
            color: "#ffffff",
            padding: "12px",
            fontSize: "14px",
          },
          head: {
            backgroundColor: "#ff7f50", // Header tabel berubah menjadi oranye terang
            color: "#ffffff", // Teks putih di header tabel
            fontWeight: "bold",
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            backgroundColor: "#252b3a", // Warna latar belakang TextField
            borderRadius: "12px",
            boxShadow: "0 2px 6px rgba(0, 0, 0, 0.5)", // Efek bayangan lebih gelap
          },
        },
      },
      MuiInputBase: {
        styleOverrides: {
          input: {
            color: "#ffffff", // Teks input tetap putih
            backgroundColor: "#252b3a", // Warna input
            padding: "12px 16px",
            borderRadius: "12px",
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            // Gaya default tombol
            color: "#ffffff",
            textTransform: "none",
            borderRadius: "12px",
            padding: "10px 20px",
            fontWeight: "600",
            boxShadow: "0 2px 6px rgba(0, 0, 0, 0.5)", // Bayangan lebih gelap
            "&:hover": {
              // Default hover
              backgroundColor: "#e67e22",
            },
          },
          // Tombol untuk "Get Job Detail" - oranye
         
          // Tombol untuk "Mark Job Complete" - hitam
        
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: "16px",
            padding: "20px",
            backgroundColor: "#252b3a", // Warna kartu
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.7)", // Bayangan lebih gelap
          },
        },
      },
    },
  });
  
  
  
  
  
  

export default function CreateJobComponent() {
  const { mutate: sendTransaction } = useSendTransaction();
  const [freelancer, setFreelancer] = useState("");
  const [amount, setAmount] = useState("");
  const [jobId, setJobId] = useState("");
  const [jobDetails, setJobDetails] = useState<any>(null);
  const contractABI = [
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "uint256",
          name: "jobId",
          type: "uint256",
        },
      ],
      name: "JobCompleted",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "uint256",
          name: "jobId",
          type: "uint256",
        },
        {
          indexed: true,
          internalType: "address",
          name: "client",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "freelancer",
          type: "address",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "amount",
          type: "uint256",
        },
      ],
      name: "JobCreated",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "uint256",
          name: "jobId",
          type: "uint256",
        },
        {
          indexed: false,
          internalType: "address",
          name: "freelancer",
          type: "address",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "amount",
          type: "uint256",
        },
      ],
      name: "PaymentReleased",
      type: "event",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "freelancer",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "amount",
          type: "uint256",
        },
      ],
      name: "createJob",
      outputs: [],
      stateMutability: "payable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "jobId",
          type: "uint256",
        },
      ],
      name: "getJobDetails",
      outputs: [
        {
          internalType: "address",
          name: "client",
          type: "address",
        },
        {
          internalType: "address",
          name: "freelancer",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "amount",
          type: "uint256",
        },
        {
          internalType: "bool",
          name: "isCompleted",
          type: "bool",
        },
        {
          internalType: "bool",
          name: "isPaid",
          type: "bool",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "jobCount",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "jobId",
          type: "uint256",
        },
      ],
      name: "markJobCompleted",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "jobId",
          type: "uint256",
        },
      ],
      name: "releasePayment",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
  ] as const;

  const contract = getContract({
    client: client,
    chain: defineChain(11155111), // Sepolia Testnet
    address: "0x06b444EcB8Fd95BbF3E5eC0a95755EAA0285C0BD",
  });
  const { data, isPending } = useReadContract({
    contract,
    method: "getJobDetails",
    params: [jobId],
  });
  const markJobCompleted = async (jobId: number) => {
    try {
      const transaction = prepareContractCall({
      contract,
      method: "function markJobCompleted(uint256 jobId)",
      params: [BigInt(jobId)],
    });
    sendTransaction(transaction);
    } catch (error) {
      console.error("Terjadi kesalahan pada transaksi:", error);
    }
  };
  const releasePayment = async (jobId: number) => {
    try {
      const transaction = prepareContractCall({
        contract,
        method: "function releasePayment(uint256 jobId)",
        params: [BigInt(jobId)],
      });
      sendTransaction(transaction);
    } catch (error) {
      console.error("Terjadi kesalahan saat mencoba melepaskan pembayaran:", error);
    }
  };

  const onClick = async () => {
    if (!freelancer || !amount) {
      alert("Mohon isi alamat freelancer dan jumlah pembayaran.");
      return;
    }
    if (isNaN(parseFloat(amount)) || parseFloat(amount) <= 0) {
      alert("Masukkan jumlah yang valid dalam Ether.");
      return;
    }
    

    try {
     
       
      const transaction = await prepareContractCall({
        contract,
        method: "function createJob()", // Nama metode saja
        params: [freelancer, ethers.parseEther(amount)], // Parse langsung amount ke Wei
        value: ethers.parseEther(amount),  // Nilai yang dikirim
      });
      sendTransaction(transaction);
    } catch (error) {
      console.error("Terjadi kesalahan pada transaksi:", error);
    }
  };
  const onClickGetJobDetails = () => {
    if (data) {
      setJobDetails(data);
    } 
  };
  console.log("ABI:", contractABI);
  
  
  



  
  return (
    <ThemeProvider theme={theme}>
     <Navbar />
    <Box sx={{ padding: "20px" }}>
      <Grid container spacing={2}>
        {/* Card kiri: Create Job */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>Create a Job</Typography>
              <TextField
                label="Freelancer Address"
                fullWidth
                margin="normal"
                value={freelancer}
                onChange={(e) => setFreelancer(e.target.value)}
              />
              <TextField
                label="Amount (in Ether)"
                type="number"
                fullWidth
                margin="normal"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
              <Button
                variant="contained"
                color="primary"
                onClick={onClick}
                style={{ marginTop: "10px" }}
              >
                Create Job
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* Card kanan: Get Job Details */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h5" gutterBottom  sx={{ fontWeight: 'bold' }}>Get Job Details</Typography>
              <TextField
                label="Job ID"
                type="number"
                fullWidth
                margin="normal"
                value={jobId}
                onChange={(e) => setJobId(e.target.value)}
              />
              <Button
  variant="contained"
  sx={{
    backgroundColor: "#ff7f50", // Oranye terang untuk tombol Get Job Details
    color: "#ffffff",
    "&:hover": {
      backgroundColor: "#e67e22", // Oranye lebih gelap saat hover
    },
    marginTop: "10px",
  }}
  onClick={onClickGetJobDetails}
>
  Get Job Details
</Button>

<Button
  variant="contained"
  sx={{
    backgroundColor: "#333333", // Hitam untuk tombol Mark Job Completed
    color: "#ffffff",
    "&:hover": {
      backgroundColor: "#222222", // Hitam lebih gelap saat hover
    },
    marginTop: "10px",
    marginLeft: "10px",
  }}
  onClick={() => markJobCompleted(Number(jobId))}
>
  Mark Job Completed
</Button>

<Button
  variant="contained"
  sx={{
    backgroundColor: "#ffffff", // Putih untuk tombol Release Payment
    color: "#000000", // Teks hitam untuk kontras
    "&:hover": {
      backgroundColor: "#f0f0f0", // Putih lebih terang saat hover
    },
    marginTop: "10px",
    marginLeft: "10px",
  }}
  onClick={() => releasePayment(Number(jobId))}
>
  Release Payment
</Button>

              {isPending && <Typography>Loading job details...</Typography>}
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Tabel untuk menampilkan Job Details */}
      
      <Box sx={{ padding: "20px", color: "#fff", minHeight: "100vh" }}>
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>Job Details </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Field</TableCell>
                <TableCell>Value</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>Client</TableCell>
                <TableCell>{jobDetails?.client || "N/A"}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Freelancer</TableCell>
                <TableCell>{jobDetails?.freelancer || "N/A"}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Amount</TableCell>
                <TableCell>{jobDetails ? `${ethers.formatEther(jobDetails.amount)} ETH` : "N/A"}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Completed</TableCell>
                <TableCell>{jobDetails?.isCompleted !== undefined ? jobDetails.isCompleted ? "Yes" : "No" : "N/A"}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Paid</TableCell>
                <TableCell>{jobDetails?.isPaid !== undefined ? jobDetails.isPaid ? "Yes" : "No" : "N/A"}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
    </ThemeProvider>
  );
}
