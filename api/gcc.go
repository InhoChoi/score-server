package main

import (
	"bytes"
	"fmt"
	"io/ioutil"
	"log"
	"os"
	"os/exec"
	"strings"
	"time"
)

//Constant
const PATH = "/tmp/" // Temp File Path
const TIMEOUT = 10   // Time-out Second

func SaveFile(input string) string {
	filename := PATH + randStringRunes(10) + ".c"
	ioutil.WriteFile(filename, []byte(input), 0644)
	return filename
}

func RemoveFile(path string, destFile string) {
	if path != "" {
		os.Remove(path)
	}
	if destFile != "" {
		os.Remove(destFile)
	}
}

func Complie(path string) (error, string, string) {
	destFile := PATH + randStringRunes(10)

	cmd := exec.Command("gcc", path, "-w", "-o", destFile)

	var outbuffer bytes.Buffer
	cmd.Stdout = &outbuffer
	cmd.Stderr = &outbuffer
	err := cmd.Run()

	if err != nil {
		return err, destFile, outbuffer.String()
	}

	return nil, destFile, outbuffer.String()
}

func Exec(destFile, input string) (error, error, string) {
	cmd := exec.Command("sh", "-c", destFile)

	cmd.Stdin = strings.NewReader(input)

	var outbuffer bytes.Buffer
	cmd.Stdout = &outbuffer
	cmd.Stderr = &outbuffer

	if err := cmd.Start(); err != nil {
		log.Fatal(err)
	}

	var timeout error = nil
	timer := time.AfterFunc(TIMEOUT*time.Second, func() {
		timeout = fmt.Errorf("timeout")
		cmd.Process.Kill()
	})

	err := cmd.Wait()
	timer.Stop()

	if err != nil {
		return err, timeout, outbuffer.String()
	}

	return nil, timeout, outbuffer.String()
}
